import React from 'react';
import { View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';
import { StyledText, AlignedText, StyledContainer, StyledBox } from '../UI';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import firebase from 'react-native-firebase';


class LScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true
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

  onLogin = (email, password) => {
    if (email != '' && password != '') {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
          ToastAndroid.show(`Log in success`, ToastAndroid.LONG);
          this.props.onLogin();
        })
        .catch((err) => {
          Alert.alert('Oops!', 'Incorrect login details. Please try again.');
        });
    } else {
      Alert.alert("Oops!", "Please check your username/password.")
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
          ToastAndroid.show(`Log in success`, ToastAndroid.LONG);
          this.props.onLogin();
        })
        .catch((err) => {
          Alert.alert('Check mail!', 'Incorrent SignIn Credentials');
        });
    } else {
      Alert.alert("Oops!", "Please check your username/password.")
    }
  }

  render() {
    let { email, secureTextEntry, password } = this.state;
    return (
      <StyledContainer>
        <Header title={"Login Screen"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
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
              <StyledText color={"Light"}> Login </StyledText>
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
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onRegister: () => {
   dispatch(NavigationActions.navigate({ routeName: 'RegisterScreen'}));
  },

  onTerms: () => {
    dispatch(NavigationActions.navigate({ routeName: 'TermScreen'}));
  },

  onLogin: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen'})],
    }))
  }
});

export default LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LScreen);