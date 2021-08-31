import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as apigwInteg from '@aws-cdk/aws-apigatewayv2-integrations';
import * as apigwAuth from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class CdkServerlessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const firebaseProjectId = "<PUT_YOUR_PROJECT_ID_HERE>"

    // The code that defines your stack goes here
    const dockerfile = path.join(__dirname, "../services/foo");
    const handler = new lambda.DockerImageFunction(this, 'FooFunction', {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
    });

    const lambdaDefaultIntegration = new apigwInteg.LambdaProxyIntegration({
      handler,
    });

    const authorizer = new apigwAuth.HttpJwtAuthorizer({
      jwtIssuer: `https://securetoken.google.com/${firebaseProjectId}`,
      jwtAudience: [
        `${firebaseProjectId}`,
      ],
    });

    const httpApi = new apigw.HttpApi(this, 'CdkServerlessApi', {
      defaultIntegration: lambdaDefaultIntegration,
      defaultAuthorizer: authorizer,
    });

    this.createNewApi('tex');
  }

  private createNewApi(serviceName: string) {
    const dockerfile = path.join(__dirname, `../services/${serviceName}`);
    const handler = new lambda.DockerImageFunction(this, `${serviceName}Function`, {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
    });

    const lambdaBackend = new apigwInteg.LambdaProxyIntegration({
      handler,
    });

    const httpApi = new apigw.HttpApi(this, `${serviceName}Api`, {
      defaultIntegration: lambdaBackend,
    });
  }

}
