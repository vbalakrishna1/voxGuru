/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { BackHandler, Alert, View, Linking, ToastAndroid, ActivityIndicator, Animated, Modal, Text, NetInfo, StatusBar } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import firebase from 'react-native-firebase';
import LottieView from 'lottie-react-native';
import { NavigationState } from './src/route';
import { LoginModal } from './src/LoginModal';
import { SubscriptionModal } from './src/SubscriptionModal';
import { VideoModal } from './src/VideoModal';
import store from './src/store';
import { Provider } from 'react-redux';
import CarrierInfo from 'react-native-carrier-info';
import HomeScreen from './src/screens/HomeScreen'
import './shim.js'

const FN = firebase.notifications();
const FCM = firebase.messaging();
const ref = firebase.firestore().collection('app');

let backCounter = 3;
var loginVar = 0;
export default class MyApp extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         progress: new Animated.Value(0),
      };
      this.unsubscribeFireStore = null;
   }

   handleFirstConnectivityChange = (connectionInfo) => {
      console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      if (connectionInfo.type == 'none') {
         Alert.alert(
            'Alert..No Internet!',
            'Do you want to exit',
            [
               { text: 'OK', onPress: () => BackHandler.exitApp() },
               { text: 'Keep waiting', onPress: () => console.log('fine') },
               { text: 'Cancel', onPress: () => this.setState({ isLoading: false }), style: 'cancel' },
            ],
            { cancelable: true }
         )
      } else {
         ToastAndroid.show(`Internet Connection type ${connectionInfo.type}`, ToastAndroid.LONG)
      }
   }

   componentWillMount() {
      store.dispatch({ type: "IS_LOADING" });
      // console.log(store.getState()); // logs intiall state
      const unsubscribe = store.subscribe(() => {
         let state = store.getState();
         // console.log(state);
         if (state.appUi.isLoading) {
            console.log('reached here');
            this.setState({ isLoading: true })
            this.animation.play();
         } else {
            if (this.animation) {
               this.animation.reset();
            }
            this.setState({ isLoading: false })
         }
      }
      );
      NetInfo.addEventListener(
         'connectionChange',
         this.handleFirstConnectivityChange
      );
   }

   componentDidMount() {
      firebase.database().ref().child('Screens').once('value')
         .then(function (snapshot) {
            if (snapshot.val()) {
               let dataSource = snapshot.val() || {};
               console.log(snapshot.val());
               store.dispatch({ type: 'INTIAL_UI', params: dataSource });
            } else {
            }
         });

      firebase.auth().onAuthStateChanged(function (user) {
         if (user) {
            loginVar = 1;
            console.log(user);
            firebase.firestore().collection("users").doc(user._user.uid).get().then(function (doc) {
               if (doc.exists) {
                  var info = doc.data();
                  console.log('!!!!!info', info);
                  store.dispatch({ type: 'USER_UPDATE', params: { info, LessonStatus, TransactionHistory } });
                  var LessonStatus = {};
                  this.ref = firebase.firestore().collection("users").doc(user._user.uid).collection("LessonStatus");
                  this.unsubscribeFireStore = this.ref.onSnapshot(this.onCollectionUpdate)
                  var TransactionHistory = {};
                  // TransactionHistory
                  firebase.firestore().collection("users").doc(user._user.uid).collection("TransactionHistory").get().then((querySnapshot) => {
                     querySnapshot.forEach((collection) => {
                        console.log("collection: ", collection.data());
                        TransactionHistory[collection.id] = collection.data();
                     });
                     store.dispatch({ type: 'USER_UPDATE', params: { TransactionHistory } });
                  });
               } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                  // extract data from real time db.
                  firebase.database().ref().child('users').child(user._user.uid).once('value')
                     .then(function (snapshot) {
                        console.log(snapshot.val());
                        let val = snapshot.val();
                        // write to firestore and also update redux store.
                        if (val) {
                           store.dispatch({ type: 'USER_FIRESTORE_CREATE', params: snapshot.val() })
                        } else {
                           let { email, displayName, photoURL } = user._user
                           let temp = {};
                           temp["info"] = { email, userName: displayName, profileThumbnail: photoURL, phone: "", genderText: "", ageText: "" }
                           store.dispatch({ type: 'USER_FIRESTORE_CREATE', params: temp });
                        }
                     })
                     .catch((error) => {
                        console.log("Error getting document:", error);
                     });
               }
            }).catch(function (error) {
               console.log("Error getting document:", error);
            });
            store.dispatch({ type: 'USER_LOGGED', params: user._user })
         } else {
            // User is signed out.
            // ...
            loginVar = 0;
            store.dispatch({ type: 'USER_NOT_LOGGED' })
         }
      });


      onCollectionUpdate = (querySnapshot) => {
         const LessonStatus = {};
         querySnapshot.forEach((doc) => { LessonStatus[doc.id] = doc.data() })
         store.dispatch({ type: 'USER_UPDATE', params: { LessonStatus } });
         console.log(LessonStatus);
      }



      BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

      CarrierInfo.isoCountryCode()
         .then((result) => {
            if (result === "in") store.dispatch({ type: 'USER_INDIA_SIM' })
         });



      FCM.getToken().then(token => {
         console.log(token);
      });
      FN.getInitialNotification().then(message => {
         console.log('Intial message received', message)
      });
      FCM.onMessage(message => {
         console.log('message received', message);
      });

      firebase.links()
         .getInitialLink()
         .then((url) => {
            if (url) {
               // app opened from a url
               console.log(url);
            } else {
               // app NOT opened from a url
               console.log("did not work");
            }
         });

      const unsubscribeLink = firebase.links().onLink((url) => {
         // ...
         console.log(url);
      });
   }
   componentWillUpdate() {
   }
   componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

      unsubscribe();
      unsubscribeLink();
      this.unsubscribeFireStore();
      NetInfo.removeEventListener(
         'connectionChange',
         this.handleFirstConnectivityChange
      );
   }
   onBackPress = () => {
      let state = store.getState();
      if (state.nav.index === 0 && state.home.index === 0 && state.about.index === 0) {
         if (backCounter < 3) {
            ToastAndroid.show(`Press ${backCounter} Times to Exit`, ToastAndroid.SHORT)
         }
         backCounter--;
      } else {
         backCounter = 3;
         this.forceUpdate();
      }
      if (backCounter <= 0) {
         Alert.alert(
            'Are you sure?',
            'Do you want to exit?',
            [
               { text: 'OK', onPress: () => BackHandler.exitApp() },
               { text: 'Ask me later', onPress: () => { backCounter = 3; this.setState({ isLoading: false }) } },
               { text: 'Cancel', onPress: () => { backCounter++; this.setState({ isLoading: false }) }, style: 'cancel' },
            ],
            { cancelable: false }
         )
      }
      store.dispatch(NavigationActions.back());
      return true;
   };

   render() {
      return (
         <Provider store={store}>
            <View style={{ flex: 1 }}>
               <StatusBar
                  backgroundColor="goldenrod"
                  barStyle="light-content"
               />
               <NavigationState />
               <SubscriptionModal />
               <VideoModal />
               <Modal
                  visible={this.state.isLoading}
                  animationType={'slide'}
                  onRequestClose={() => this.onBackPress()}
                  transparent
               >
                  <View style={{ flex: 1, opacity: 0.95, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                     <LottieView
                        ref={animation => {
                           this.animation = animation;
                        }}
                        source={require('./assets/data.json')}
                     />
                  </View>
               </Modal>
            </View>
         </Provider>
      );
   }
}

// keytool -genkey -v -keystore drawerNavigation-release-key.keystore -alias drawerNavigation-key-alias -keyalg RSA -keysize 2048 -validity 10000

// keytool -exportcert -list -v -alias drawerNavigation-key-alias -keystore drawerNavigation-release-key.keystore

// keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore