import * as webappDeploy from "@capraconsulting/webapp-deploy-lambda"
import * as cdk from "aws-cdk-lib"
import * as cf from "aws-cdk-lib/aws-cloudfront"
import * as origins from "aws-cdk-lib/aws-cloudfront-origins"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as ssm from "aws-cdk-lib/aws-ssm"
import type * as constructs from "constructs"
import { projectPrefix } from "../config"

interface Props extends cdk.StackProps {
  envName: string
  artifactS3Key: string
}

export class WebappStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: Props) {
    super(scope, id, props)

    const artifactsBucket = s3.Bucket.fromBucketName(
      this,
      "ArtifactsBucket",
      "incub-common-build-artifacts-001112238813-eu-west-1",
    )

    const webBucket = new s3.Bucket(this, "WebBucket", {
      encryption: s3.BucketEncryption.S3_MANAGED,
    })

    const distribution = new cf.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(webBucket, {
          originPath: "/web",
        }),
      },
      defaultRootObject: "index.html",
      priceClass: cf.PriceClass.PRICE_CLASS_100,
      errorResponses: [
        {
          httpStatus: 403,
          ttl: cdk.Duration.minutes(5),
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          ttl: cdk.Duration.minutes(5),
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    })

    new webappDeploy.WebappDeploy(this, "WebappDeploy", {
      source: webappDeploy.Source.bucket(artifactsBucket, props.artifactS3Key),
      webBucket,
      distribution,
    })

    new ssm.StringParameter(this, "DomainNameParam", {
      parameterName: `/${projectPrefix}/${props.envName}/webapp-domain-name`,
      stringValue: distribution.domainName,
    })
  }
}
