#!/usr/bin/env groovy

// See https://github.com/capralifecycle/jenkins-pipeline-library
@Library("cals") _

def pipelines = new no.capraconsulting.buildtools.lifligcdkpipelines.LifligCdkPipelines()

def artifactsBucketName = "incub-common-build-artifacts-001112238813-eu-west-1"
def artifactsRoleArn = "arn:aws:iam::001112238813:role/incub-common-build-artifacts-liflig-jenkins"

buildConfig(
  jobProperties: [
    parameters([
      booleanParam(
        defaultValue: false,
        description: "Skip branch check - force deploy to DEV",
        name: "devOverrideBranchCheck"
      ),
    ])
  ],
  slack: [channel: "#cals-dev-info"],
) {
  // Remove this after modifying all resource references
  // if using this repo as a template.
  if (!env.JOB_NAME.contains("liflig-internal/liflig-cdk-app-reference")) {
    error("Was this repo copied without being modified?")
  }

  dockerNode {
    checkout scm

    insideToolImage("node:18") {
      stage("Install dependencies") {
        sh "npm ci"
      }

      stage("Lint") {
        sh "npm run lint"
      }

      stage("Verify CDK snapshots") {
        sh """
          npm run snapshots
          git status
          git diff --exit-code
        """
      }

      def bucketKey

      stage("Package and upload CDK source zip") {
        bucketKey = pipelines.packageAndUploadCdkSource(
          bucketName: artifactsBucketName,
          roleArn: artifactsRoleArn,
          include: "assets cdk.json cdk.context.json package* src tsconfig.json"
        )
      }

      def deployDev = params.devOverrideBranchCheck || env.BRANCH_NAME == "master"
      if (deployDev) {
        stage("Trigger dev pipelines") {
          pipelines.configureAndTriggerCdkSourcePipelines(
            cdkSourceBucketKey: bucketKey,
            artifactsBucketName: artifactsBucketName,
            artifactsRoleArn: artifactsRoleArn,
            pipelines: ["cdkappref-core-dev"],
          )
        }
      }

      def deployProd = env.BRANCH_NAME == "master"
      if (deployProd) {
        stage("Trigger prod pipelines") {
          pipelines.configureAndTriggerCdkSourcePipelines(
            cdkSourceBucketKey: bucketKey,
            artifactsBucketName: artifactsBucketName,
            artifactsRoleArn: artifactsRoleArn,
            pipelines: ["cdkappref-core-prod"],
          )
        }
      }
    }
  }
}
