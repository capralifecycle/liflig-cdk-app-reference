import { tagResources } from "@liflig/cdk"
import type * as constructs from "constructs"

export const buildAccountId = "001112238813"
export const devAccountId = "001112238813"
export const stagingAccountId = "001112238813"
export const prodAccountId = "001112238813"

export const projectPrefix = "cdkappref"

export function applyTags(scope: constructs.Construct) {
  tagResources(scope, (stack) => ({
    StackName: stack.stackName,
    Project: "liflig-cdk-app-reference",
    SourceRepo: "github/capralifecycle/liflig-cdk-app-reference",
  }))
}
