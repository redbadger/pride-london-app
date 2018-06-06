#!/bin/bash

sed -i '' '/Google.*\\.[h|m]/d' ./node_modules/react-native-maps/lib/ios/AirMaps.xcodeproj/project.pbxproj