import { cdkPipelines } from "@liflig/cdk"
import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import type * as constructs from "constructs"
import { prodAccountId, projectPrefix, stagingAccountId } from "../config"
import { CoreStage } from "../stages/core-stage"

export class CoreProdPipelineStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const artifactsBucket = s3.Bucket.fromBucketName(
      this,
      "ArtifactsBucket",
      "incub-common-build-artifacts-001112238813-eu-west-1",
    )

    const pipeline = new cdkPipelines.LifligCdkPipeline(this, "Pipeline", {
      artifactsBucket,
      pipelineName: `${projectPrefix}-core-prod`,
      sourceType: "cdk-source",
    })

    pipeline.cdkPipeline.addStage(
      new CoreStage(this, `${projectPrefix}-staging`, {
        env: {
          account: stagingAccountId,
          region: "eu-west-1",
        },
        envName: "staging",
        webappArtifactS3Key: cdkPipelines.getVariable(
          "prodWebappArtifactS3Key",
        ),
      }),
    )

    pipeline.cdkPipeline.addStage(
      new CoreStage(this, `${projectPrefix}-prod`, {
        env: {
          account: prodAccountId,
          region: "eu-west-1",
        },
        envName: "prod",
        webappArtifactS3Key: cdkPipelines.getVariable(
          "prodWebappArtifactS3Key",
        ),
      }),
    )
  }
}
