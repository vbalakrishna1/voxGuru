import React from 'react';
import { View, TouchableOpacity, Alert, ToastAndroid, Text, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';

import { StyledText, AlignedText, StyledContainer, StyledBox } from '../UI';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';

import firebase from 'react-native-firebase';
import LottieView from 'lottie-react-native';


class RScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
      registerState: false,
    }
  }

  triggerRegisterState = () => {
    Keyboard.dismiss();
    this.setState({
      registerState: true
    }, () => console.log("Current State in Process: " + this.state.registerState));
  }

  resetRegisterState = () => {
    this.setState({
      registerState: false
    }, () => console.log("Current State after Finish: " + this.state.registerState));
  }

  componentDidMount() {
  }

  onAccessoryPress = () => {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  renderPasswordAccessory = () => {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ?
      'visibility' :
      'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting
      />
    );
  }

  // Old Registration Function
  //
  // onRegister = (email, password) => {
  //   if (email != '' && password != '') {
  //     if (password.length >= 8) {
  //       firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
  //         .then((user) => {
  //           // ToastAndroid.show(`user created and login success`, ToastAndroid.LONG);
  //           ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);

  //           this.props.onRegister();
  //         })
  //         .catch((err) => {
  //           console.log('error of login', err);
  //           Alert.alert('This account already exists.', 'Login as existing user or create a new account.');
  //         });
  //     } else {
  //       Alert.alert("Oops!", "Password should be a atleast 8 characters long.")
  //     }

  //   } else {
  //     Alert.alert("Oops!", "Please check your username/password.")
  //   }

  // }



  // Registration Original Backup 31 Oct 2019

  // onRegister = (email, password) => {
  //   console.log("Current State before Start: " + this.state.registerState);
  //   if(this.state.registerState === false) {
  //     this.triggerRegisterState();
  //     if (email != '' && password != '') {
  //       if (password.length >= 8) {
  //         firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
  //           .then((user) => {
  //             // ToastAndroid.show(`user created and login success`, ToastAndroid.LONG);
  //             ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);

  //             this.props.onRegister();
  //           })
  //           .catch((error) => {
  //             switch(error.code) {
  //               case 'auth/email-already-in-use':
  //                 Alert.alert('Oops!', 'Email already in use! Please login as existing user.');
  //                 break;
  //               case 'auth/network-request-failed':
  //               case 'auth/unknown':
  //                 Alert.alert('Oops!', 'Something went wrong! Please try again.');
  //                 break;
  //               // case 'auth/too-many-requests':
  //               //   Alert.alert('Oops!', 'Too many login request, Please try after sometime!');
  //               //   break;
  //               case 'auth/invalid-email':
  //                 Alert.alert('Oops!', 'Please enter a valid email address!');
  //                 break;
  //             }
  //             let errorCode = error.code;
  //             firebase.analytics().logEvent(`Errors`, {RegisterError:errorCode});
  //             console.log(errorCode);
  //             this.resetRegisterState();
  //             return error;
  //           });
  //       } else {
  //         this.triggerRegisterState();
  //         Alert.alert(  
  //           'Oops!',  
  //           'Password should have a minimum of 8 characters!',  
  //           [
  //             {text: 'OK', onPress: () => this.resetRegisterState()},  
  //           ],
  //           {cancelable: false}  
  //         );
  //       }
  //     } else {
  //       this.triggerRegisterState();
  //       Alert.alert(  
  //         'Oops!',  
  //         'Please check your username/password.',  
  //         [
  //           {text: 'OK', onPress: () => this.resetRegisterState()},
  //         ],
  //         {cancelable: false}  
  //       );
  //     }
  //   }
  // }

onRegister = (email, password) => {
  email = email.trim();
  console.log("Current State before Start: " + this.state.registerState);
  if(this.state.registerState === false) {
    this.triggerRegisterState();
    if (email != '') {
      // Validation RegEx
      let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      // Email Validation
      if(emailValidate.test(email) === false)
      {
        // Invalid Email
        this.triggerRegisterState();
        Alert.alert(  
          'Oops!',  
          'Please enter a valid email address!',  
          [
            {text: 'OK', onPress: () => this.resetRegisterState()},
          ],
          {cancelable: false}  
        );        
        firebase.analytics().logEvent(`Errors`, {RegisterError:"auth/invalid-email"});
        return false;
      } else {
        // Valid Email
        firebase.auth().fetchSignInMethodsForEmail(email)
          .then((method) => {
            let checkSignIn = method.length;
            // User Already Registered
            if(checkSignIn != 0) {
              Alert.alert(  
                'Oops!',  
                'Email already in use! Please login as existing user.',  
                [
                  {text: 'OK', onPress: () => this.resetRegisterState()},
                ],
                {cancelable: false}  
              );              
              firebase.analytics().logEvent(`Errors`, {RegisterError:"auth/email-already-in-use"});
            } else {
              // Password Check
              if (password.length >= 8) {
                // New Registration
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                  .then((user) => {
                    ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);
                    this.props.onRegister();
                  })
                  .catch((error) => {
                    console.log(error.code);
                    switch(error.code) {
                      case 'auth/network-request-failed':
                      case 'auth/unknown':
                        Alert.alert(  
                          'Oops!',  
                          'Something went wrong! Please try again.',  
                          [
                            {text: 'OK', onPress: () => this.resetRegisterState()},
                          ],
                          {cancelable: false}  
                        );
                        break;
                    }
                    let errorCode = error.code;
                    firebase.analytics().logEvent(`Errors`, {RegisterError:errorCode});
                    this.resetRegisterState();
                    return error;
                  });
              } else {
                Alert.alert(  
                  'Oops!',  
                  'Password should have a minimum of 8 characters!',  
                  [
                    {text: 'OK', onPress: () => this.resetRegisterState()},  
                  ],
                  {cancelable: false}  
                );
              }
            }
          })
      }
    } else {
      this.resetRegisterState();
    }
  }
}

//   render() {
//     // firebase.analytics().logEvent(`Registration_Page`);
//     let { email, secureTextEntry, password } = this.state;
//     if(this.state.registerState == false) {
//       return (
//         <StyledContainer>
//           <Header title={"Register with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
//           <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
//             <View style={{ width: " 90%" }}>
//               <TextField
//                 label='Email Id'
//                 value={email}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 enablesReturnKeyAutomatically={true}
//                 returnKeyType='next'
//                 onChangeText={(email) => this.setState(prevState => ({ email }))}
//               />
//               <TextField
//                 value={password}
//                 secureTextEntry={secureTextEntry}
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 enablesReturnKeyAutomatically={true}
//                 onFocus={this.onFocus}
//                 onChangeText={(password) => this.setState(prevState => ({ password }))}
//                 returnKeyType='done'
//                 label='Password'
//                 maxLength={30}
//                 renderAccessory={this.renderPasswordAccessory}
//               />
//             </View>

//             <View style={{ width: "90%", paddingBottom: 10, marginBottom: 10, }}>

//               <TouchableOpacity onPress={() => this.onRegister(email, password)}
//                 style={{
//                   backgroundColor: '#6b38a5',
//                   flexDirection: "column",
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 4,
//                   minHeight: 40,
//                   margin: 10,
//                 }}
//               >
//                 <StyledText color={"Light"} weight={'Bold'}> Register </StyledText>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={this.props.onTerms}>
//                 <View
//                   style={{
//                     borderTopWidth: 1,
//                     borderTopColor: "#222222",
//                     alignItems: "center"
//                   }}>
//                   <AlignedText size={"Small"} align={"Center"}> Terms & Conditions </AlignedText>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </StyledContainer>
//       );
//     } else {
//       return(
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator 
//             size={'large'}
//             color={'black'}/>
//           <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading</Text>
//         </View>
//       );
//     }
//   }
// }

  // Start of Render
  render() {
    // firebase.analytics().logEvent(`Registration_Page`);
    let { email, secureTextEntry, password } = this.state;
    if(this.state.registerState == false) {
      width = 0;
      height = 0;
    } else {
      width = Dimensions.get('window').width; 
      height = Dimensions.get('window').height;
    }
    return (
      <StyledContainer>
        <Header title={"Register with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ width: " 90%" }}>
            <TextField
              label='Email Id'
              value={email}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              returnKeyType='next'
              onChangeText={(email) => this.setState(prevState => ({ email }))}
            />
            <TextField
              value={password}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={(password) => this.setState(prevState => ({ password }))}
              returnKeyType='done'
              label='Password'
              maxLength={30}
              renderAccessory={this.renderPasswordAccessory}
            />
          </View>

          <View style={{ width: "90%", paddingBottom: 10, marginBottom: 10, }}>

            <TouchableOpacity onPress={() => this.onRegister(email, password)}
              style={{
                backgroundColor: '#6b38a5',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                minHeight: 40,
                margin: 10,
              }}
            >
              <StyledText color={"Light"} weight={'Bold'}> Register </StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onTerms}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "#222222",
                  alignItems: "center"
                }}>
                <AlignedText size={"Small"} align={"Center"}> Terms & Conditions </AlignedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: "rgba(0,0,0,0.2)", flex: 1, position: 'absolute', left: 0, top: 0, width: width, height: height, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView source={require('../../assets/data.json')} autoPlay loop />
        </View>
      </StyledContainer>
    );
    // End of Render
  }
}


const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({
  onTerms: () => {
    dispatch(NavigationActions.navigate({ routeName: 'TermScreen' }));
  },
  onRegister: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
    }))
  }
});

export default RegisterScreen = connect(mapStateToProps, mapDispatchToProps)(RScreen);