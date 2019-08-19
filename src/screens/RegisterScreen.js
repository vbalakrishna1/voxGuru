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


class RScreen extends React.Component {

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

  onRegister = (email, password) => {
    if (email != '' && password != '') {
      if (password.length >= 8) {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
          .then((user) => {
            ToastAndroid.show(`user created and login success`, ToastAndroid.LONG);
            this.props.onRegister();
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('This account already exists.', 'Login as existing user or create a new account.');
          });
      } else {
        Alert.alert("Oops!", "Password should be a atleast 8 characters long.")
      }

    } else {
      Alert.alert("Oops!", "Please check your username/password.")
    }

  }


  render() {
    let { email, secureTextEntry, password } = this.state;
    return (
      <StyledContainer>
        <Header title={"Register through Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
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
              <StyledText color={"Light"}> Register </StyledText>
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
      </StyledContainer>
    );
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