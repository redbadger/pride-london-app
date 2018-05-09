/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <BugsnagReactNative/BugsnagReactNative.h>
#import <Bugsnag.h>
#import <BugsnagConfiguration.h>

#import "SplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #if DEBUG == 0
    [[Fabric sharedSDK] setDebug: YES];
    [Fabric with:@[[Crashlytics class]]];
  #endif

  // Init Bugsnag natively first in case React Native crashes before launching
  BugsnagConfiguration *config = [BugsnagConfiguration new];
  config.releaseStage = [self plistValueForKey:@"__RN_CONFIG_RELEASE_STAGE"];
  [Bugsnag startBugsnagWithConfiguration:config];
  [Bugsnag notifyError:[NSError errorWithDomain:@"com.example" code:408 userInfo:nil]];
  // Launch Bugsnag for React Native code
  [BugsnagReactNative start];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"PrideLondonApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [SplashScreen show];
  return YES;
}

-(NSString *) plistValueForKey:(NSString *)key {
  NSBundle* mainBundle = [NSBundle mainBundle];
  NSString *value = [mainBundle objectForInfoDictionaryKey:key];
  return value;
}

@end
