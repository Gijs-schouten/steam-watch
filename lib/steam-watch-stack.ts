import * as cdk from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class SteamWatchStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambda = new Function(this, 'MyLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: Code.fromAsset('./handlers/check-prices/index.ts'),
    });

    const rule = new Rule(this, 'MyRule', {
      schedule: Schedule.cron({ minute: '0', hour: '9' }),
    });

    rule.addTarget(new LambdaFunction(myLambda));

  }
}
