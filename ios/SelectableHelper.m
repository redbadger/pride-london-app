#import "SelectableHelper.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation SelectableHelper

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return self.bridge.uiManager.methodQueue;
}

RCT_EXPORT_METHOD(makeSelectable:(nonnull NSNumber *)reactNode)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    dispatch_async(dispatch_get_main_queue(), ^{
      UIView *view = viewRegistry[reactNode];

      UITapGestureRecognizer *recognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleTap:)];
      recognizer.numberOfTapsRequired = 1;
      recognizer.numberOfTouchesRequired = 1;
      [view addGestureRecognizer:recognizer];
    });
  }];
}

- (void) handleTap:(UITapGestureRecognizer *)recognizer
{
  UIView *view = recognizer.view;
  UIAccessibilityTraits newTraits = view.accessibilityTraits^UIAccessibilityTraitSelected;
  view.accessibilityTraits = newTraits;
}

@end
