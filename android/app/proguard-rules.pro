-dontwarn com.facebook.hermes.**
-keep class com.facebook.hermes.** { *; }

-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.fabric.** { *; }

-keep class com.oblador.keychain.** { *; }
-keepclassmembers class com.oblador.keychain.** { *; }

-keep class com.reactnativemmkv.** { *; }
-keepclassmembers class com.reactnativemmkv.** { *; }

-keep class com.lugg.RNCConfig.** { *; }
-keepclassmembers class com.lugg.RNCConfig.** { *; }

-keep class com.rapplogic.** { *; }

-keepattributes Signature
-keepattributes *Annotation*

-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

-keep class com.rapiclave.app.** { *; }
-keepclassmembers class com.rapiclave.app.** { *; }

-renamesourcefileattribute SourceFile
-keepattributes SourceFile, LineNumberTable
