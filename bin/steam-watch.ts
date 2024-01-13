#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SteamWatchStack } from '../lib/steam-watch-stack';

const app = new cdk.App();
new SteamWatchStack(app, 'SteamWatchStack', {});