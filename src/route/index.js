import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { addListener } from '../utils';
import SideMenu from '../Component/SideMenu';
import firebase from 'react-native-firebase';
import AboutUsScreen from '../screens/AboutUsScreen';
import AboutGuruScreen from '../screens/AboutGuruScreen';
import AboutAllScreen from '../screens/AboutAllScreen';
import BookLiveScreen from '../screens/BookLiveScreen';
import CourseScreen from '../screens/CourseScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import SubcribeScreen from '../screens/SubscribeScreen';
import WeekViewScreen from '../screens/WeekViewScreen';
import TermScreen from '../screens/TermScreen';
import LessonNotes from '../screens/LessonNotes';
import { LoginModal } from '../LoginModal';
import ChooseLogin from '../screens/ChooseLogin'
var x;

firebase.auth().onAuthStateChanged(function (user) {
   if (user) {
      x = 0
   }
   else {
      x = 1

   }
})

const routeConfiguration = {
   HomeScreen: {
      screen: HomeScreen,
   },
   CourseScreen: {
      screen: CourseScreen,
   },
   WeekViewScreen: {
      screen: WeekViewScreen,
   },
   LessonScreen: {
      screen: LessonScreen,
   },
   LessonNotes: {
      screen: LessonNotes,
   },
   LoginScreen: {
      screen: LoginScreen,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   },
   RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   },
   TermScreen: {
      screen: TermScreen,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   },
   LoginModal: {
      screen: LoginModal,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   },
   ChooseLogin: {
      screen: ChooseLogin,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   }

}

// going to disable the header for now
const stackNavigatorConfiguration = {
   headerMode: 'none',
   initialRouteName: x == 0 ? 'HomeScreen' : 'LoginModal'
}

export const HomeStack = StackNavigator(
   routeConfiguration, stackNavigatorConfiguration
);

export const StackNavigationReducer = (state, action) => {
   if (action.type === 'RESET_STACK') {
      // console.log(...state);
      // return { ...state}
      return { ...state }
   } else {
      return HomeStack.router.getStateForAction(action, state)
   }
}

class StackNavigationState extends React.Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      home: PropTypes.object.isRequired,
   };




   render() {
      const { dispatch, home } = this.props;


      return (
         <HomeStack
            navigation={addNavigationHelpers({
               dispatch,
               state: home,
               addListener,
            })}
         />
      );
   }
}


export const StackState = connect(mapStateToProps)(StackNavigationState);


// const secondRouteConfiguration = {
//    AboutUsScreen: {
//       screen: AboutUsScreen,
//    },
//    AboutAllScreen: {
//       screen: AboutAllScreen,
//    },
//    AboutGuruScreen: {
//       screen: AboutGuruScreen,
//    },
// }
const secondRouteConfiguration = {
   
   AboutUsScreen: {
      screen: AboutUsScreen,
   },
   AboutAllScreen: {
      screen: AboutAllScreen,
   },
   AboutGuruScreen: {
      screen: AboutGuruScreen,
   },
   HomeScreen : {
      screen : HomeScreen
   },
  
}

// // going to disable the header for now
const secondStackNavigatorConfiguration = {
   headerMode: 'none',
   initialRouteName: 'AboutUsScreen'
}

export const AboutStack = StackNavigator(
   secondRouteConfiguration, secondStackNavigatorConfiguration
);

export const AboutStackNavigationReducer = (state, action) => {
   if (action.type === 'OPEN_DRAWER') {
      // console.error(state);
      return { ...state }
      // return { ...state, index: 0}
   } else {
      return AboutStack.router.getStateForAction(action, state)
   }
}

class AboutStackNavigationState extends React.Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      about: PropTypes.object.isRequired,
   };

   render() {
      const { dispatch, about } = this.props;
      return (
         <AboutStack
            navigation={addNavigationHelpers({
               dispatch,
               state: about,
               addListener,
            })}
         />
      );
   }
}


export const AboutStackState = connect(mapStateToProps)(StackNavigationState);




export const AppNavigator = DrawerNavigator({
   Home: {
      screen: HomeStack,
   },
   Subscribe: {
      screen: SubcribeScreen,
   },
   BookLiveClass: {
      screen: BookLiveScreen,
   },
   MyAccount: {
      screen: MyAccountScreen,
   },
   AboutUs: {
      screen: AboutStack,
   },
   HelpCenter: {
      screen: HelpCenterScreen,
   },
   PrivacyPolicy: {
      screen: PrivacyScreen,
   },
   LoginModal: {
      screen: LoginModal,
      navigationOptions: { drawerLockMode: 'locked-closed' }
   },
   ChooseLogin: {
      screen: ChooseLogin
   }

}, {
      drawerWidth: 250,
      drawerPosition: 'left',
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      initialRouteName: 'Home',
      contentComponent: props => (<SideMenu />)
   });

// contentComponent: props => (<SideMenu />)
class AppWithNavigationState extends React.Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      nav: PropTypes.object.isRequired,
   };

   componentDidMount() {

      firebase.auth().onAuthStateChanged(function (user) {
         if (user) {
            x = 0
         }
         else {
            x = 1
         }
      })
   }

   render() {
      const { dispatch, nav } = this.props;
      return (
         <AppNavigator
            navigation={addNavigationHelpers({
               dispatch,
               state: nav,
               addListener,
            })}
         />
      );
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
   home: state.home
});

export const NavigationState = connect(mapStateToProps)(AppWithNavigationState);

export const AppNavigationReducer = (state, action) => {

   switch (action.type) {
      case 'OPEN_DRAWER':
         return { ...state, index: 1 }
         break;
      default:
         return AppNavigator.router.getStateForAction(action, state);
   }

}