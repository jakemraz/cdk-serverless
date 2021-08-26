import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as apigwInteg from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class CdkServerlessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const dockerfile = path.join(__dirname, "../services/foo");
    const handler = new lambda.DockerImageFunction(this, 'FooFunction', {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
    });

    const lambdaDefaultIntegration = new apigwInteg.LambdaProxyIntegration({
      handler,
    });

    const httpApi = new apigw.HttpApi(this, 'CdkServerlessApi', {
      defaultIntegration: lambdaDefaultIntegration
    });
  }
}
