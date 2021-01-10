import * as ssm from "@aws-cdk/aws-ssm"
import * as cdk from "@aws-cdk/core"

interface Props extends cdk.StackProps {
  envName: string
}

export class CoreStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props)

    new ssm.StringParameter(this, "ExampleResource", {
      stringValue: props.envName,
    })
  }
}
