import * as cdk from '@aws-cdk/core';
import * as wiremock from './wiremockapi-service';

export class WireMockAPIStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new wiremock.WireMockService(this, 'WireMock');
    }
}
