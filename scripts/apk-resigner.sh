#!/bin/bash
# https://github.com/onbiron/apk-resigner
# Sample usage is as follows;
# ./signapk myapp.apk debug.keystore android androiddebugkey
 
APK=$1
KEYSTORE=$2
ALIAS=$3
STOREPASS=$4

# get the filename
SIGNED_APK="resigned.apk"

# delete META-INF folder
zip -d $APK META-INF/\*

# sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE -storepass $STOREPASS $APK $ALIAS
# verify
jarsigner -verify $APK

#zipalign
zipalign -v 4 $APK $SIGNED_APK 