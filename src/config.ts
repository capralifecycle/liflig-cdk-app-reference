import * as cdk from "@aws-cdk/core"
import { tagResources } from "@liflig/cdk"

export const buildAccountId = "001112238813"
export const devAccountId = "001112238813"
export const stagingAccountId = "001112238813"
export const prodAccountId = "001112238813"

export const projectPrefix = "cdkappref"

export function applyTags(scope: cdk.Construct) {
  tagResources(scope, (stack) => ({
    StackName: stack.stackName,
    Project: "liflig-cdk-app-reference",
    SourceRepo: "github/capralifecycle/liflig-cdk-app-reference",
  }))
}
