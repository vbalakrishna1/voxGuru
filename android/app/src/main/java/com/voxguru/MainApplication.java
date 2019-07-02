package com.voxguru;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.bitgo.randombytes.RandomBytesPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnta.clear.ClearCachePackage;
import com.smixx.fabric.FabricPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.branch.referral.Branch;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.ianlin.RNCarrierInfo.RNCarrierInfoPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.airbnb.android.react.lottie.LottiePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RandomBytesPackage(),
            new VectorIconsPackage(),
            new RNBranchPackage(),
            new RNFirebasePackage(),
            new LinearGradientPackage(),
            new ClearCachePackage(),
            new FabricPackage(),
            new RNGestureHandlerPackage(),
            new FBSDKPackage(mCallbackManager),

            new LottiePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseLinksPackage(),   
            new KCKeepAwakePackage(),
            new RNCarrierInfoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    Branch.getAutoInstance(this);
    Fabric.with(this, new Crashlytics());
  }
}
