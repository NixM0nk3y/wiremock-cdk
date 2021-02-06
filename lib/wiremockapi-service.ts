import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";
import * as lambda from "@aws-cdk/aws-lambda";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations"

export interface WireMockProps {
}

export class WireMockService extends core.Construct {
    constructor(scope: core.Construct, id: string, props: WireMockProps = {}) {
        super(scope, id);

        const wiremock = new lambda.Function(this, "WireMockHandler", {
            runtime: lambda.Runtime.JAVA_11,
            code: lambda.Code.fromAsset("lambda", {
                bundling: {
                    image: lambda.Runtime.JAVA_11.bundlingDockerImage,
                    command: [
                        'bash', '-c', 'sam build --build-dir output && cp -Rp output/WireMockFunction/* /asset-output',
                    ],
                },
            }),
            handler: "wiremock.StreamLambdaHandler::handleRequest",
            timeout: core.Duration.seconds(25),
            tracing: lambda.Tracing.ACTIVE,
            reservedConcurrentExecutions: 10,
            memorySize: 2048,
            environment: {
                SOURCE_ACL: '165.225.80.126/32;81.109.20.10/32;194.145.126.0/24'
            }
        });

        const httpApi = new apigateway.HttpApi(this, 'WireMockHttpApi');

        httpApi.addRoutes({
            path: '/{proxy+}',
            methods: [apigateway.HttpMethod.ANY],
            integration: new integrations.LambdaProxyIntegration({ handler: wiremock, payloadFormatVersion: apigateway.PayloadFormatVersion.VERSION_2_0 }),
        });
    }
}