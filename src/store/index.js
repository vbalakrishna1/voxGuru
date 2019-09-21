'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
// import * as asyncInitialState from 'redux-async-initial-state';

import firebase from 'react-native-firebase';

import { AppNavigationReducer, StackNavigationReducer, AboutStackNavigationReducer } from '../route';
import { appUiReducer } from '../AppUiReducer';
import { loginReducer } from '../LoginModal';
import { videoReducer } from '../VideoModal';
import { subscriptionReducer } from '../SubscriptionModal';
import { userReducer } from '../UserReducer';
import { navMiddleWare } from '../utils';
// import { screenTracking } from '../screenTracking';

import { NavigationActions } from 'react-navigation';
import { ToastAndroid } from 'react-native';


const executeIfFunction = f =>
  f instanceof Function ? f() : f;

const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key));

var backTracking = 0;
const reactNavigationMiddleware = store => dispatch => action => {

  const days = ['Navigation/NAVIGATE', 'Navigation/BACK',
    'Navigation/COMPLETE_TRANSITION', 'USER_UPDATE',
    'USER_FIRESTORE_CREATE', 'USER_LESSONSTATUS_UPDATE',
    , 'OPEN_PAY', 'USER_PRACTICE_END', 'OPEN_VIDEO',
    'USER_LOGGED']

  const getDay = switchcaseF(
    days.reduce((acc, value) =>
      (acc[value] = true, acc), {})
  )(false)

  if (getDay(action.type)) {
    if (action.type == 'Navigation/NAVIGATE') {
      console.log(action.routeName);
      // course screen
      if (action.routeName == "CourseScreen") {
        console.log(action.params.courseId)
        firebase.analytics().setCurrentScreen(`CourseScreen ${action.params.courseId}`, "CourseScreen");
        firebase.analytics().logEvent(`Page_CourseScreen`, { id: action.params.courseId });
      }
      if (action.routeName == "WeekViewScreen") {
        console.log(action.params.zero.levelId)
        firebase.analytics().setCurrentScreen(`WeekViewScreen ${action.params.zero.levelId}`, "WeekViewScreen");
        firebase.analytics().logEvent(`Page_WeekViewScreen`, { id: action.params.zero.levelId });
      }
      if (action.routeName == "LessonScreen") {
        console.log(action.params.lessonId)
        firebase.analytics().setCurrentScreen(`LessonScreen ${action.params.lessonId}`, "LessonScreen");
        firebase.analytics().logEvent(`Page_LessonScreen`, { id: action.params.lessonId });
      }

      if (action.routeName == "BookLiveClass" || action.routeName == "Subscribe" ||
        action.routeName == "MyAccount" || action.routeName == "HelpCenter" ||
        action.routeName == "AboutUs" || action.routeName == "PrivacyPolicy") {
        // console.log("ran");
        firebase.analytics().setCurrentScreen(`Page_${action.routeName}`, action.routeName);
        firebase.analytics().logEvent(`Page_${action.routeName}`);
      }
    }

    if (action.type == 'OPEN_PAY') {
      firebase.analytics().logEvent(`Open_Pay`, { id: action.params.info.currentLevelId });
    }



    if (action.type == 'USER_LOGGED') {
      firebase.analytics().setUserProperty('emailId', action.params.email);
    }

    if (action.type == 'USER_FIRESTORE_CREATE' && store.getState().user.user.uid) {
      console.log('------action.params.info', action.params.info)
      firebase.firestore().doc(`users/${store.getState().user.user.uid}`).set(action.params.info).then(function (docRef) {
        console.log("-----------------wrote successfully");

        // firebase.firestore().collection(`users/${store.getState().user.user.uid}/LessonStatus`).add(action.params.LessonStatus)
        //   .then(function(docRef) { })

        let batch = firebase.firestore().batch();
        let lessons = firebase.firestore().collection(`users/${store.getState().user.user.uid}/LessonStatus`)
        let userTran = firebase.firestore().collection(`users/${store.getState().user.user.uid}/TransactionHistory`)
        let globalTran = firebase.firestore().collection(`transaction`);

        for (var key in action.params.LessonStatus) {
          var lessonRef = lessons.doc(key);
          batch.set(lessonRef, action.params.LessonStatus[key]);
        }

        for (var key in action.params.TransactionHistory) {
          var userTranRef = userTran.doc(key);
          batch.set(userTranRef, action.params.TransactionHistory[key]);
        }

        for (var key in action.params.TransactionHistory) {
          var globalTranRef = globalTran.doc(action.params.TransactionHistory[key].txnid);
          batch.set(globalTranRef, action.params.TransactionHistory[key]);
        }

        batch.commit().then(function () {
          console.log("batch wrote successfully");
        })
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

    }

    if (action.type == 'USER_LESSONSTATUS_UPDATE' && store.getState().user.user.uid) {

      let batch = firebase.firestore().batch();
      let lessons = firebase.firestore().collection(`users/${store.getState().user.user.uid}/LessonStatus`)

      for (var key in action.params) {
        console.log('update', action.params[key])
        var lessonRef = lessons.doc(key);
        batch.set(lessonRef, action.params[key]);
      }

      batch.commit().then(function () {
        console.log("batch wrote successfully");
      }).catch(function (error) {
        console.log("Error writing batch:", error);
      });
    }
  }

  if (action.type == 'OPEN_VIDEO') {
    firebase.analytics().logEvent(`Open_Video`, { id: action.params });
  }

  dispatch(action);
}

const screenTracking = store => ({ dispatch }) => action => {
  if (action.routeName) {
    console.log(action.routeName);
  }
  dispatch(action)
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(navMiddleWare,
    reactNavigationMiddleware, // handles redux for react navigation
    thunk, // lets us dispatch() functions
    // loggerMiddleware, // neat middleware that logs actions
  ),
  // other store enhancers if any
);

const reducer = combineReducers({
  nav: AppNavigationReducer,
  home: StackNavigationReducer,
  about: AboutStackNavigationReducer,
  login: loginReducer,
  subscription: subscriptionReducer,
  video: videoReducer,
  appUi: appUiReducer,
  user: userReducer,
});

export default createStore(
  reducer,
  enhancer);