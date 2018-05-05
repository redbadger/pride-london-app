#import "Analytics.h"
#import <Crashlytics/Crashlytics.h>

@implementation Analytics

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(trackEvent:(NSString *)name data:(NSDictionary *)data)
{
  // Note: Answers caches all events locally until the next time the app is run.
  // At that point it then sends all events to Fabric from the last session.
  [Answers logCustomEventWithName:name customAttributes:data];
}
@end
