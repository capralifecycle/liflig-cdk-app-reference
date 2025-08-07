import { cdkPipelines } from "@liflig/cdk"
import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import type * as constructs from "constructs"
import { devAccountId, projectPrefix } from "../config"
import { CoreStage } from "../stages/core-stage"

export class CoreDevPipelineStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const artifactsBucket = s3.Bucket.fromBucketName(
      this,
      "ArtifactsBucket",
      "incub-common-build-artifacts-001112238813-eu-west-1",
    )

    const pipeline = new cdkPipelines.LifligCdkPipeline(this, "Pipeline", {
      artifactsBucket,
      pipelineName: `${projectPrefix}-core-dev`,
      sourceType: "cdk-source",
    })

    pipeline.cdkPipeline.addStage(
      new CoreStage(this, `${projectPrefix}-dev`, {
        env: {
          account: devAccountId,
          region: "eu-west-1",
        },
        envName: "dev",
        webappArtifactS3Key: cdkPipelines.getVariable("devWebappArtifactS3Key"),
      }),
    )
  }
}
