import React from 'react';
import { View, TouchableOpacity, Alert, Text, ToastAndroid, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';
import { StyledText, AlignedText, StyledContainer, StyledBox } from '../UI';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import firebase from 'react-native-firebase';
import LottieView from 'lottie-react-native';

class LScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
      loginState: false,
      fixColorValue: "rgba(0,0,0,0.2)"
    }
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

  // onLogin = (email, password) => {
  //   console.log("Current State before Start: " + this.state.loginState);
  //   if(this.state.loginState === false) {
  //     this.setState({
  //       loginState: true
  //     }, () => console.log("Current State in Process: " + this.state.loginState));
  //     if (email != '' && password != '') {
  //       firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
  //         .then((user) => {
  //           ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);
            
  //           this.props.onLogin();

  //         })
  //         .catch((error) => {
  //           switch(error.code) {
  //             case 'auth/email-already-in-use':
  //               Alert.alert('Oops!', 'Email already in use!');
  //               break;
  //             case 'auth/network-request-failed':
  //             case 'auth/unknown':
  //               Alert.alert('Oops!', 'Poor network connection!');
  //               break;
  //             case 'auth/too-many-requests':
  //               Alert.alert('Oops!', 'Too many login request, Please try after sometime!');
  //               break;
  //             case 'auth/user-not-found':
  //               Alert.alert('Oops!', 'Email address not found!');
  //               break;
  //             case 'auth/invalid-email':
  //               Alert.alert('Oops!', 'Invalid email address!');
  //               break;
  //             case 'auth/wrong-password':
  //               Alert.alert('Oops!', 'Incorrect password!');
  //               break;
  //           }
  //           let errorCode = error.code;
  //           firebase.analytics().logEvent(`Errors`, {LoginError:errorCode});
  //           console.log(errorCode);
  //           this.setState({
  //             loginState: false
  //           }, () => console.log("Current State after Finish: " + this.state.loginState));
  //           return error;
  //         });
  //     } else {
  //       Alert.alert("Oops!", "Please check your username/password.")
  //     }
  //   }
  // }
  triggerLoginState = () => {
    Keyboard.dismiss();
    this.setState({
      loginState: true
    }, () => console.log("Current State in Process: " + this.state.loginState));
  }
  resetLoginState = () => {
    this.setState({
      loginState: false
    }, () => console.log("Current State after Finish: " + this.state.loginState));
  }

  // onLogin = (email, password) => {
  //   console.log("Current State before Start: " + this.state.loginState);
  //   if(this.state.loginState === false) {
  //     this.triggerLoginState();
  //     if (email != '' && password != '') {
  //       firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
  //         .then((user) => {
  //           ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);
            
  //           this.props.onLogin();

  //         })
  //         .catch((error) => {
  //           switch(error.code) {
  //             // case 'auth/email-already-in-use':
  //             //   Alert.alert('Oops!', 'Email already in use!');
  //             //   break;
  //             case 'auth/network-request-failed':
  //             case 'auth/unknown':
  //               this.triggerLoginState();
  //               Alert.alert(  
  //                 'Oops!',  
  //                 'Something went wrong! Please try again.',  
  //                 [
  //                   {text: 'OK', onPress: () => this.resetLoginState()},
  //                 ],
  //                 {cancelable: false}  
  //               );
  //               break;
  //             // case 'auth/too-many-requests':
  //             //   Alert.alert('Oops!', 'Too many login request, Please try after sometime!');
  //             //   break;
  //             case 'auth/user-not-found':
  //               this.triggerLoginState();
  //               Alert.alert(  
  //                 'Oops!',  
  //                 'We couldnt find your login id! Please try again or login as new user.',  
  //                 [
  //                   {text: 'OK', onPress: () => this.resetLoginState()},
  //                 ],
  //                 {cancelable: false}  
  //               );
  //               break;
  //             case 'auth/invalid-email':
  //               this.triggerLoginState();
  //               Alert.alert(  
  //                 'Oops!',  
  //                 'Please enter a valid email address!',  
  //                 [
  //                   {text: 'OK', onPress: () => this.resetLoginState()},
  //                 ],
  //                 {cancelable: false}  
  //               );
  //               break;
  //             case 'auth/wrong-password':
  //               this.triggerLoginState();
  //               Alert.alert(  
  //                 'Oops!',  
  //                 'Incorrect password! Please try again.',  
  //                 [
  //                   {text: 'OK', onPress: () => this.resetLoginState()},
  //                 ],
  //                 {cancelable: false}  
  //               );
  //               break;
  //           }
  //           let errorCode = error.code;
  //           firebase.analytics().logEvent(`Errors`, {LoginError:errorCode});
  //           console.log(errorCode);
  //           this.resetLoginState();
  //           return error;
  //         });
  //     } else {
  //       this.triggerLoginState();
  //       if(email != '' && password == '') {
  //         Alert.alert(  
  //           'Oops!',  
  //           'Please enter your password!',  
  //           [
  //             {text: 'OK', onPress: () => this.resetLoginState()},  
  //           ],
  //           {cancelable: false}  
  //         );
  //       } else {
  //         Alert.alert(  
  //           'Oops!',  
  //           'Please enter your email address!',  
  //           [
  //             {text: 'OK', onPress: () => this.resetLoginState()},  
  //           ],
  //           {cancelable: false}  
  //         );
  //       }
  //     }
  //   }
  // }

  onLogin = (email, password) => {
    email = email.trim();
    this.setState({
      fixColorValue: "rgba(0,0,0,0.2)"
    }, () => console.log("Color: " + this.state.fixColorValue));
    console.log("Current State before Start: " + this.state.loginState);
    if(this.state.loginState === false) {
      this.triggerLoginState();
      if (email != '' && password != '') {
        // Validation RegEx
        let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        // Email Validation
        if(emailValidate.test(email) === false)
        {
          // Invalid Email
          this.triggerLoginState();
          Alert.alert(  
          'Oops!',  
          'Please enter a valid email address!',  
          [
          {text: 'OK', onPress: () => this.resetLoginState()},
          ],
          {cancelable: false}  
          );        
          firebase.analytics().logEvent(`Errors`, {LoginError:"auth/invalid-email"});
          return false;
        } else {
          firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
              ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);
              
              this.props.onLogin();

            })
            .catch((error) => {
              this.setState({
                fixColorValue: "rgba(0,0,0,0.2)"
              }, () => console.log("Color: " + this.state.fixColorValue));
              switch(error.code) {
                // case 'auth/email-already-in-use':
                //   Alert.alert('Oops!', 'Email already in use!');
                //   break;
                case 'auth/network-request-failed':
                case 'auth/unknown':
                  this.triggerLoginState();
                  triggerMessage = ""
                  Alert.alert(  
                    'Oops!',  
                    'Something went wrong! Please try again.',  
                    [
                      {text: 'OK', onPress: () => this.resetLoginState()},
                    ],
                    {cancelable: false}  
                  );
                  break;
                // case 'auth/too-many-requests':
                //   Alert.alert('Oops!', 'Too many login request, Please try after sometime!');
                //   break;
                case 'auth/user-not-found':
                  this.triggerLoginState();
                  Alert.alert(  
                    'Oops!',  
                    'We couldnt find your login id! Please try again or login as new user.',  
                    [
                      {text: 'OK', onPress: () => this.resetLoginState()},
                    ],
                    {cancelable: false}  
                  );
                  break;
                case 'auth/invalid-email':
                  this.triggerLoginState();
                  Alert.alert(  
                    'Oops!',  
                    'Please enter a valid email address!',  
                    [
                      {text: 'OK', onPress: () => this.resetLoginState()},
                    ],
                    {cancelable: false}  
                  );
                  break;
                case 'auth/wrong-password':
                  this.triggerLoginState();
                  Alert.alert(  
                    'Oops!',  
                    'Incorrect password! Please try again.',  
                    [
                      {text: 'OK', onPress: () => this.resetLoginState()},
                    ],
                    {cancelable: false}  
                  );
                  break;
              }
              let errorCode = error.code;
              firebase.analytics().logEvent(`Errors`, {LoginError:errorCode});
              console.log(errorCode);
              this.resetLoginState();
              return error;
            });
          }
      } else {
        this.triggerLoginState();
        if(email != '' && password == '') {
          Alert.alert(  
            'Oops!',  
            'Please enter your password!',  
            [
              {text: 'OK', onPress: () => this.resetLoginState()},  
            ],
            {cancelable: false}  
          );
        } else {
          Alert.alert(  
            'Oops!',  
            'Please enter your email address!',  
            [
              {text: 'OK', onPress: () => this.resetLoginState()},  
            ],
            {cancelable: false}  
          );
        }
      }
    }
  }

  onResetPassword = (email) => {
    if (email != '') {

      firebase.auth().sendPasswordResetEmail(email).then((msg) => {
        Alert.alert('Check email!', 'We have sent you the password reset link.');
        // ToastAndroid.show(`Please check your mail to reset your password`, ToastAndroid.LONG);
      }).catch((err) => {
        Alert.alert('Oops!', 'Please check your username');
      })



    } else {
      Alert.alert("Oops!", "Please enter your email.")
    }
  }


  onRegister = (email) => {
    if (email != '' && password != '') {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
          ToastAndroid.show(`Logged in!`, ToastAndroid.LONG);
          this.props.onLogin();
        })
        .catch((err) => {
          Alert.alert('Check mail!', 'Incorrent SignIn Credentials');
        });
    } else {
      Alert.alert("Oops!", "Please check your username/password.")
    }
  }

  // render() {
  //   let { email, secureTextEntry, password } = this.state;
  //   var width = Dimensions.get('window').width; 
  //   var height = Dimensions.get('window').height; 
  //   if(this.state.loginState == false) {
  //     return (
  //       <StyledContainer>
  //         <Header title={"Login with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
  //         <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
  //           <View style={{ width: " 90%" }}>
  //             <TextField
  //               label='Email Id'
  //               value={email}
  //               autoCapitalize='none'
  //               autoCorrect={false}
  //               enablesReturnKeyAutomatically={true}
  //               returnKeyType='next'
  //               onChangeText={(email) => this.setState(prevState => ({ email }))}
  //             />
  //             <TextField
  //               value={password}
  //               secureTextEntry={secureTextEntry}
  //               autoCapitalize='none'
  //               autoCorrect={false}
  //               enablesReturnKeyAutomatically={true}
  //               onFocus={this.onFocus}
  //               onChangeText={(password) => this.setState(prevState => ({ password }))}
  //               returnKeyType='done'
  //               label='Password'
  //               maxLength={30}
  //               renderAccessory={this.renderPasswordAccessory}
  //             />
  //             <View
  //               style={{
  //                 justifyContent: 'space-between',
  //                 flexWrap: 'nowrap',
  //                 flexDirection: 'row',
  //                 paddingTop: 10,
  //               }}>
  //               <TouchableOpacity onPress={() => { this.onResetPassword(email) }}>
  //                 <StyledText size={"Small"} >Forgot Password? </StyledText>
  //               </TouchableOpacity>
  //               <TouchableOpacity onPress={this.props.onRegister}>
  //                 <StyledText size={"Small"} >New User? Sign Up </StyledText>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //           <View style={{ width: "90%", paddingBottom: 10, marginBottom: 10, }}>

  //             <TouchableOpacity onPress={() => { this.onLogin(email, password) }}
  //               style={{
  //                 backgroundColor: '#6b38a5',
  //                 flexDirection: "column",
  //                 alignItems: 'center',
  //                 justifyContent: 'center',
  //                 borderRadius: 4,
  //                 minHeight: 40,
  //                 margin: 10,
  //               }}
  //             >
  //               <StyledText color={"Light"} weight={'Bold'}> Login </StyledText>
  //             </TouchableOpacity>
  //             <TouchableOpacity onPress={this.props.onTerms}>
  //               {/* <TouchableOpacity  onPress={this.onLogout}>  */}

  //               <View
  //                 style={{
  //                   borderTopWidth: 1,
  //                   borderTopColor: "#222222",
  //                   alignItems: "center"
  //                 }}>
  //                 <AlignedText size={"Small"} align={"Center"}> Terms & Conditions </AlignedText>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //         <View style={{ backgroundColor: "#000000", flex: 1, position: 'absolute', left: 0, top: 0, opacity: 0.6, width: width, height: height, justifyContent: 'center', alignItems: 'center'}}>
  //           <ActivityIndicator 
  //           size={'large'}
  //           color={'black'}/>
  //           <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading</Text>
  //         </View>
  //       </StyledContainer>
  //     );
  //   } else {
  //     return(
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <ActivityIndicator 
  //           size={'large'}
  //           color={'black'}/>
  //         <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading</Text>
  //       </View>
  //     );
  //   }
  // }

  // Start of Render
  render() {
    let { email, secureTextEntry, password } = this.state;
    let width;
    let height;
    if(this.state.loginState == false) {
      width = 0;
      height = 0;
    } else {
      width = Dimensions.get('window').width; 
      height = Dimensions.get('window').height;
    }
      return (
        <StyledContainer>
          <Header title={"Login with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
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
              <View
                style={{
                  justifyContent: 'space-between',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                  paddingTop: 10,
                }}>
                <TouchableOpacity onPress={() => { this.onResetPassword(email) }}>
                  <StyledText size={"Small"} >Forgot Password? </StyledText>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onRegister}>
                  <StyledText size={"Small"} >New User? Sign Up </StyledText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "90%", paddingBottom: 10, marginBottom: 10, }}>

              <TouchableOpacity onPress={() => { this.onLogin(email, password) }}
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
                <StyledText color={"Light"} weight={'Bold'}> Login </StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.onTerms}>
                {/* <TouchableOpacity  onPress={this.onLogout}>  */}

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
          <View style={{ backgroundColor: this.state.fixColorValue, flex: 1, position: 'absolute', left: 0, top: 0, width: width, height: height, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView source={require('../../assets/data.json')} autoPlay loop />
          </View>
        </StyledContainer>
      );
  }
  // End of Render
}

const mapStateToProps = state => ({
  home: state.home,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onRegister: () => {
    dispatch(NavigationActions.navigate({ routeName: 'RegisterScreen' }));
  },

  onTerms: () => {
    dispatch(NavigationActions.navigate({ routeName: 'TermScreen' }));
  },

  onLogin: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
    }))
  }
});

export default LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LScreen);