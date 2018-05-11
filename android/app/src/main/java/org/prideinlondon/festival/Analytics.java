package org.prideinlondon.festival;

import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.CustomEvent;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

public class Analytics extends ReactContextBaseJavaModule {

  public Analytics(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Analytics";
  }

  @ReactMethod
  public void trackEvent(String name, ReadableMap data) {
    CustomEvent event = applyReadableMap(new CustomEvent(name), data);
    Answers.getInstance().logCustom(event);
  }

  private CustomEvent applyReadableMap(CustomEvent event, ReadableMap readableMap) {
    ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
    while (iterator.hasNextKey()) {
        String key = iterator.nextKey();
        ReadableType type = readableMap.getType(key);
        switch (type) {
            case Number:
                event.putCustomAttribute(key, readableMap.getDouble(key));
                break;
            case String:
                event.putCustomAttribute(key, readableMap.getString(key));
                break;
            default:
                break;
        }
    }
    return event;
}

}
