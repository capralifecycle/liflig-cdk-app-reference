import * as cdk from "aws-cdk-lib"
import { applyTags, buildAccountId, projectPrefix } from "./config"
import { CoreDevPipelineStack } from "./pipelines/core-dev"
import { CoreProdPipelineStack } from "./pipelines/core-prod"

const app = new cdk.App()

applyTags(app)

new CoreDevPipelineStack(app, `${projectPrefix}-build-core-dev-pipeline`, {
  env: {
    account: buildAccountId,
    region: "eu-west-1",
  },
})

new CoreProdPipelineStack(app, `${projectPrefix}-build-core-prod-pipeline`, {
  env: {
    account: buildAccountId,
    region: "eu-west-1",
  },
})
