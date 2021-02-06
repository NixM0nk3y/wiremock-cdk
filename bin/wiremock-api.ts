#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WireMockAPIStack } from '../lib/wiremockapi-stack';

const app = new cdk.App();
new WireMockAPIStack(app, 'WireMockAPIStack',
    {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION
        }
    }
);