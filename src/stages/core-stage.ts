import * as cdk from "@aws-cdk/core"
import { applyTags } from "../config"
import { CoreStack } from "../stacks/core"
import { WebappStack } from "../stacks/webapp"

interface Props extends cdk.StageProps {
  envName: string
}

export class CoreStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props)

    applyTags(this)

    new CoreStack(this, "core", {
      envName: props.envName,
    })

    new WebappStack(this, "webapp", {
      envName: props.envName,
    })
  }
}
