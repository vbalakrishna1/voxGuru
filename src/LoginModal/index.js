// 'use strict'

// // React
// import React from 'react'
// import { Modal, View, Text, Button, TouchableOpacity, StyleSheet, ToastAndroid, Alert, Image, ImageBackground } from 'react-native'
// //Redux
// import { connect } from 'react-redux'
// import Icon from 'react-native-vector-icons/Ionicons';
// import { NavigationActions } from 'react-navigation';
// import firebase from 'react-native-firebase';
// import {
//    StyledContainer,
//    StyledImageContainer, StyledFullWidthContainer,
//    StyledListContainer,
//    StyledVideoBar,
//    StyledText,
//    StyledButton,
//    StyledBox,
//    StyledFloatBar,
//    SmallButton,
//    AlignedText, StyledImageCard
// } from '../UI';
// const FBSDK = require('react-native-fbsdk');
// const {
//    LoginManager,
//    AccessToken
// } = FBSDK;

// const auth = firebase.auth();
// const provider = firebase.auth.FacebookAuthProvider;

// const mapStateToProps = (state) => {
//    return {
//       login: state.login,
//    }
// }

// class LoginModalNavigation extends React.Component {

//    constructor() {
//       super();

//       this.state = {
//          modalVisible: false,
//       };

//    }

//    componentDidMount() {
//    }

//    componentWillUnmount() {
//       console.log("modal unmounted");
//    }





//    componentWillReceiveProps(nextProps) {
//       if (nextProps.login !== this.props.login) {
//          if (nextProps.login.modalVisible) {
//             this.setState({ modalVisible: true })
//          } else {
//             this.setState({ modalVisible: false })
//          }
//       }
//    }

//    fbLogin = () => {
//       var self = this;
//       LoginManager.logInWithReadPermissions(["public_profile", "email"])
//          .then((res) => {
//             if (res.isCancelled) {
//                console.log("cancelled");
//             } else {
//                AccessToken.getCurrentAccessToken().then(
//                   (data) => {
//                      console.log(data);
//                      var temp = data.accessToken.toString();
//                      var credential = firebase.auth.FacebookAuthProvider.credential(temp);

//                      firebase.auth().signInAndRetrieveDataWithCredential(credential)
//                         .then(function (user) {
//                            console.log("Sign In Success", user);
//                            ToastAndroid.show(`Logged in as ${user.additionalUserInfo.profile.name}`, ToastAndroid.LONG);

//                            self.props.dispatch(self.closeModal());

//                         }, function (error) {
//                            console.log("Sign In Error", error);
//                            Alert.alert(
//                               'Alert..Wait!',
//                               error.message,
//                               [
//                                  { text: 'OK', onPress: () => self.props.dispatch(self.closeModal()) },
//                               ],
//                               { cancelable: false }
//                            )
//                         })
//                         .catch(function (error) {
//                            // Handle Errors here.
//                            var errorCode = error.code;
//                            var errorMessage = error.message;
//                            console.log(errorMessage)
//                            // ...
//                         });
//                   }
//                );
//             }
//          }),
//          (err) => {
//             alert('Login fail with error: ' + err);
//          }
//    }

//    openModal = () => {
//       return { type: 'OPEN_LOGIN', payload: null }
//    }

//    closeModal = () => {
//       return { type: 'CLOSE_LOGIN', payload: null }
//    }



//    onLearnMore = () => {
//       this.props.dispatch(this.closeModal());
//    }

//    onEmailLogin = () => {
//       this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }), this.closeModal());
//    }

//    onEmailReg = () => {
//       this.props.dispatch(NavigationActions.navigate({ routeName: 'RegisterScreen' }), this.closeModal());
//    }

//    onTerms = () => {
//       this.props.dispatch(NavigationActions.navigate({ routeName: 'TermScreen' }), this.closeModal());
//    }


//    render() {
//       return (
//          // <Modal
//          //    visible={this.state.modalVisible}
//          //    animationType={'slide'}
//          //    onRequestClose={this.onLearnMore}
//          // >
//          <ImageBackground source={require('../images/loginScreen_background.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}>
//             <TouchableOpacity
//                style={{
//                   padding: 10
//                }} onPress={this.onLearnMore}>
//                <Icon name="md-close" size={30} color="#fefefe" />
//             </TouchableOpacity>
//             <View style={{ height: "100%", justifyContent: "center" }}>
//                <View>
//                   <Text
//                      style={{
//                         paddingTop: 10,
//                         paddingBottom: 10,
//                         alignSelf: 'center',
//                         color: '#6a3d98',
//                      }}>
//                      <Text style={{ fontFamily: "Nunito-Bold", fontSize: 17 }} weight={'Bold'}>Let's get you in.</Text>
//                   </Text>
//                   <View
//                      style={{
//                         flexDirection: 'row',
//                         backgroundColor: '#3b5998',
//                         borderRadius: 4,
//                         margin: 10,
//                      }}>
//                      <TouchableOpacity onPress={this.fbLogin}
//                         style={{
//                            flexDirection: 'row',
//                            flexGrow: 1,
//                            alignItems: "center",
//                            justifyContent: "center",
//                         }}>
//                         <Image style={{
//                            maxHeight: 40,
//                            resizeMode: 'contain',
//                            backgroundColor: '#3b5998'
//                         }} source={require('../images/facebook.png')} />
//                         <Text style={{
//                            paddingRight: 50,
//                            paddingLeft: 10,
//                            color: "#ffffff"
//                         }}>
//                            <Text style={{ fontFamily: "Nunito-Bold" }}>Login with Facebook</Text>
//                         </Text>
//                      </TouchableOpacity>
//                   </View>
//                   <TouchableOpacity onPress={this.onEmailLogin}>
//                      <View
//                         style={styles.bigButton}>
//                         <Text
//                            style={{
//                               color: '#ffffff',
//                            }}>
//                            <Text style={{ fontFamily: "Nunito-Bold" }}>Login with Email</Text>
//                         </Text>
//                      </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={this.onEmailReg}>
//                      <View
//                         style={styles.regButton}>
//                         <Text
//                            style={{
//                               color: '#6a3d98',
//                            }}>
//                            <Text style={{ fontFamily: "Nunito-Bold" }}>Register with Email</Text>
//                         </Text>
//                      </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={this.onTerms}>
//                      <View
//                         style={{
//                            flexDirection: "column",
//                            alignItems: 'center',
//                            justifyContent: 'center',
//                            borderTopWidth: 0.2,
//                            borderTopColor: '#6a3d98',
//                            marginHorizontal: 10,
//                            height: 40
//                         }}>
//                         <Text
//                            style={{
//                               color: '#6a3d98',
//                            }}>
//                            <Text style={{ fontFamily: "Nunito-Bold" }}>Terms & Conditions</Text>
//                         </Text>
//                      </View>
//                   </TouchableOpacity>
//                </View>
//             </View>
//          </ImageBackground>
//          // </Modal>
//       )
//    }
// }

// const styles = StyleSheet.create({
//    container: {
//       flex: -1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//    },
//    bigButton: {
//       backgroundColor: '#6b38a5',
//       flexDirection: "column",
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: 4,
//       minHeight: 40,
//       margin: 10,
//    },
//    regButton: {
//       backgroundColor: 'lightgrey',
//       flexDirection: "column",
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: 4,
//       minHeight: 40,
//       margin: 10,
//    }
// });

// export const LoginModal = connect(mapStateToProps)(LoginModalNavigation);


// export const loginReducer = (state, action) => {
//    switch (action.type) {
//       case 'OPEN_LOGIN':
//          return { ...state, modalVisible: true }
//          break;
//       case 'CLOSE_LOGIN':
//          return { ...state, modalVisible: false }
//          break;
//       default:
//          return { ...state, modalVisible: false };
//    }
// }
'use strict'

// React
import React from 'react'
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet, ToastAndroid, Alert, Image, ImageBackground, BackHandler } from 'react-native'
//Redux
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions,StackActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import {
   StyledContainer,
   StyledImageContainer, StyledFullWidthContainer,
   StyledListContainer,
   StyledVideoBar,
   StyledText,
   StyledButton,
   StyledBox,
   StyledFloatBar,
   SmallButton,
   AlignedText, StyledImageCard
} from '../UI';
const FBSDK = require('react-native-fbsdk');
const {
   LoginManager,
   AccessToken
} = FBSDK;

const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

const mapStateToProps = (state) => {
   return {
      login: state.login,
   }
}

class LoginModalNavigation extends React.Component {

   constructor() {
      super();

      this.state = {
         modalVisible: true,
      };

   }

   componentDidMount() {

      // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

   }

   componentWillUnmount() {
      // BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
      console.log("modal unmounted");
   }
   // onBackPress = () => {

   //    firebase.auth().onAuthStateChanged(function (user) {
   //       if (user) {
   //          this.props.navigation.dispatch(NavigationActions.back())
   //       } else {
   //          Alert.alert(
   //             'Are you sure?',
   //             'Do you want to exit?',
   //             [
   //                { text: 'OK', onPress: () => BackHandler.exitApp() },
   //                { text: 'Cancel', onPress: () => { this.setState({ isLoading: false }) }, style: 'cancel' },
   //             ],
   //             { cancelable: false }
   //          )
   //       }
   //    })
   //    return true;
   // };

   componentWillReceiveProps(nextProps) {
      if (nextProps.login !== this.props.login) {
         if (nextProps.login.modalVisible) {
            this.setState({ modalVisible: true })
         } else {
            this.setState({ modalVisible: false })
         }
      }
   }

   fbLogin = () => {
      var self = this;
      LoginManager.logInWithReadPermissions(["public_profile", "email"])
         .then((res) => {
            if (res.isCancelled) {
               console.log("cancelled");
            } else {
               AccessToken.getCurrentAccessToken().then(
                  (data) => {
                     console.log(data);
                     var temp = data.accessToken.toString();
                     var credential = firebase.auth.FacebookAuthProvider.credential(temp);

                     firebase.auth().signInAndRetrieveDataWithCredential(credential)
                        .then(function (user) {
                           console.log("Sign In Success", user);
                           ToastAndroid.show(`Logged in as ${user.additionalUserInfo.profile.name}`, ToastAndroid.LONG);

                           // self.props.dispatch(self.closeModal());


                           self.props.dispatch(NavigationActions.reset({
                              index: 0,
                              actions: [NavigationActions.navigate({ routeName: 'HomeScreen'})],
                            }))
                           // self.props.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }));

                        }, function (error) {
                           console.log("Sign In Error", error);
                           Alert.alert(
                              'Alert..Wait!',
                              error.message,
                              [
                                 { text: 'OK', onPress: () => self.props.dispatch(self.closeModal()) },
                              ],
                              { cancelable: false }
                           )
                        })
                        .catch(function (error) {
                           // Handle Errors here.
                           var errorCode = error.code;
                           var errorMessage = error.message;
                           console.log(errorMessage)
                           // ...
                        });
                  }
               );
            }
         }),
         (err) => {
            alert('Login fail with error: ' + err);
         }
   }

   openModal = () => {
      return { type: 'OPEN_LOGIN', payload: null }
   }

   closeModal = () => {
      return { type: 'CLOSE_LOGIN', payload: null }
   }



   onLearnMore = () => {
      this.props.dispatch(this.closeModal());
   }

   onEmailLogin = () => {
      // this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }));
      this.props.dispatch(NavigationActions.navigate({ routeName: 'ChooseLogin' }));

   }

   onEmailReg = () => {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'RegisterScreen' }), this.closeModal());
   }

   onTerms = () => {
      // this.props.navigation.navigate("TermScreen")
      this.props.dispatch(NavigationActions.navigate({ routeName: 'TermScreen' }));
   }


   render() {
      return (
         <View>
            <ImageBackground source={require('../images/loginScreen_background.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}>
               <TouchableOpacity
                  style={{
                     padding: 10
                  }} onPress={this.onLearnMore}>
               </TouchableOpacity>
               <View style={{ height: "100%", justifyContent: "center", marginTop: 30 }}>
                  <View>
                     <Text
                        style={{
                           paddingTop: 10,
                           paddingBottom: 10,
                           alignSelf: 'center',
                           color: '#6a3d98',
                        }}>
                        <Text style={{ fontFamily: "Nunito-Bold", fontSize: 17 }} weight={'Bold'}>Let's get you in.</Text>
                     </Text>
                     <View
                        style={{
                           flexDirection: 'row',
                           backgroundColor: '#3b5998',
                           borderRadius: 4,
                           margin: 10,
                        }}>
                        <TouchableOpacity onPress={this.fbLogin}
                           style={{
                              flexDirection: 'row',
                              flexGrow: 1,
                              alignItems: "center",
                              justifyContent: "center",
                           }}>
                           <Image style={{
                              maxHeight: 40,
                              resizeMode: 'contain',
                              backgroundColor: '#3b5998'
                           }} source={require('../images/facebook.png')} />
                           <Text style={{
                              paddingRight: 50,
                              paddingLeft: 10,
                              color: "#ffffff"
                           }}>
                              <Text style={{ fontFamily: "Nunito-Bold" }}>Login with Facebook</Text>
                           </Text>
                        </TouchableOpacity>
                     </View>
                     <TouchableOpacity onPress={this.onEmailLogin}>
                        <View
                           style={styles.bigButton}>
                           <Text
                              style={{
                                 color: '#ffffff',
                              }}>
                              <Text style={{ fontFamily: "Nunito-Bold" }}>Login with Email</Text>
                           </Text>
                        </View>
                     </TouchableOpacity>
                     {/* <TouchableOpacity onPress={this.onEmailReg}>
                     <View
                        style={styles.regButton}>
                        <Text
                           style={{
                              color: '#6a3d98',
                           }}>
                           <Text style={{ fontFamily: "Nunito-Bold" }}>Register with Email</Text>
                        </Text>
                     </View>
                  </TouchableOpacity> */}
                     <TouchableOpacity onPress={this.onTerms}>
                        <View
                           style={{
                              flexDirection: "column",
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderTopWidth: 0.2,
                              borderTopColor: '#6a3d98',
                              marginHorizontal: 10,
                              height: 40
                           }}>
                           <Text
                              style={{
                                 color: '#6a3d98',
                              }}>
                              <Text style={{ fontFamily: "Nunito-Bold" }}>Terms & Conditions</Text>
                           </Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </ImageBackground>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: -1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   bigButton: {
      backgroundColor: '#6b38a5',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      minHeight: 40,
      margin: 10,
   },
   regButton: {
      backgroundColor: 'lightgrey',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      minHeight: 40,
      margin: 10,
   }
});

export const LoginModal = connect(mapStateToProps)(LoginModalNavigation);

export const loginReducer = (state, action) => {
   switch (action.type) {
      case 'OPEN_LOGIN':
         return { ...state, modalVisible: true }
         break;
      case 'CLOSE_LOGIN':
         return { ...state, modalVisible: false }
         break;
      default:
         return { ...state, modalVisible: false }
   }
}