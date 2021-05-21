import * as s3 from "@aws-cdk/aws-s3"
import * as cdk from "@aws-cdk/core"
import { cdkPipelines } from "@liflig/cdk"
import { devAccountId, projectPrefix } from "../config"
import { CoreStage } from "../stages/core-stage"

export class CoreDevPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    // No Griid for incub yet.
    const artifactsBucket = s3.Bucket.fromBucketName(
      this,
      "ArtifactsBucket",
      "incub-common-build-artifacts-001112238813-eu-west-1",
    )

    const pipeline = new cdkPipelines.LifligCdkPipeline(this, "Pipeline", {
      // Can be removed if using a Griid-provisioned account.
      artifactsBucket,
      pipelineName: `${projectPrefix}-core-dev`,
      sourceType: "cdk-source",
    })

    pipeline.cdkPipeline.addApplicationStage(
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
