import * as constructs from "constructs"
import * as ssm from "aws-cdk-lib/aws-ssm"
import * as cdk from "aws-cdk-lib"
import { projectPrefix } from "../config"

interface Props extends cdk.StackProps {
  envName: string
}

export class CoreStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: Props) {
    super(scope, id, props)

    new ssm.StringParameter(this, "ExampleResource", {
      stringValue: props.envName,
    })

    new ssm.StringParameter(this, "DemoParam", {
      parameterName: `/${projectPrefix}/${props.envName}/demo`,
      stringValue: "hello world",
    })
  }
}
