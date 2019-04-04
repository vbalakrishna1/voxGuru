'use strict'

// React
import React from 'react'
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet, ToastAndroid, Alert, Image } from  'react-native'
//Redux
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

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
            modalVisible: false,
          };

        }
      
        componentDidMount() {
        }
      
        componentWillUnmount() {
          console.log("modal unmounted");
        }
      




        componentWillReceiveProps(nextProps) {
            if(nextProps.login !== this.props.login) {
                if (nextProps.login.modalVisible) {
                    this.setState({modalVisible: true})
                } else {
                    this.setState({modalVisible: false})
                }
            }
        }

        fbLogin =()=> {
          var self = this;
          LoginManager.logInWithReadPermissions(["public_profile", "email"])
          .then((res) => {
              if(res.isCancelled) {
                  console.log("cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data);
                      var temp = data.accessToken.toString();
                      var credential = firebase.auth.FacebookAuthProvider.credential(temp);

                      firebase.auth().signInAndRetrieveDataWithCredential(credential)
                      .then(function(user) {
                        console.log("Sign In Success", user);
                        ToastAndroid.show(`Logged in as ${user.additionalUserInfo.profile.name}`, ToastAndroid.LONG);

                        self.props.dispatch(self.closeModal());

                      }, function(error) {
                        console.log("Sign In Error", error);
                        Alert.alert(
                          'Alert..Wait!',
                          error.message,
                          [
                            {text: 'OK', onPress: () =>  self.props.dispatch(self.closeModal())},
                           ],
                          { cancelable: false }
                        )
                      })
                      .catch(function(error) {
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
        return{ type:'OPEN_LOGIN', payload: null }
    }

    closeModal = () => {
        return{ type:'CLOSE_LOGIN', payload: null }
    }

    
    
    onLearnMore = () =>{
       this.props.dispatch(this.closeModal());
    }

    onEmailLogin = () =>{
        this.props.dispatch(NavigationActions.navigate({routeName: 'LoginScreen'}), this.closeModal());
     }

     onEmailReg = () =>{
      this.props.dispatch(NavigationActions.navigate({routeName: 'RegisterScreen'}), this.closeModal());
   }

     onTerms = () =>{
        this.props.dispatch(NavigationActions.navigate({routeName: 'TermScreen'}), this.closeModal());
     }


  render(){
    return (
      <Modal
      visible={this.state.modalVisible}
      animationType={'slide'}
      onRequestClose={this.onLearnMore}
      transparent
      >

      <View style={{flex:1, opacity: 0.95, backgroundColor:'rgba(0,0,0,0.7)'}}>
        <View 
      style={{
      backgroundColor: '#ffbb00',
      }}>
      <View
      style={{
      paddingTop: 10,
      }}>

      <TouchableOpacity
          style={{
            padding: 10
            }} onPress={this.onLearnMore}>
        <Icon name="md-close" size={30} color ="#fefefe" />
      </TouchableOpacity>
      <Text
      style={{
      paddingTop: 10,
      alignSelf: 'center',
      color:'white',
      }}>
      <Text>
        Sign In. You Know You Want To 
      </Text>
      </Text>
            <Text
      style={{
      paddingTop: 10,
      alignSelf: 'center',
      color:'white',
      }}> 
      <Text>
      It will take less than 5 Seconds  
      </Text>
      </Text>
      </View>
      <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#3b5998',
        borderRadius: 4,
        margin: 10,
      }}>
      <TouchableOpacity  onPress={this.fbLogin}
      style={{
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
             <Image style={{
            maxHeight: 40,
            resizeMode: 'contain',
            backgroundColor: '#3b5998'}} source={require('../images/facebook.png')}/>
        <Text style={{
            paddingRight: 50,
            paddingLeft: 10,
            color: "#ffffff"}}>
            <Text>
            Login with Facebook
            </Text>
        </Text>
       </TouchableOpacity>
      </View>
     <TouchableOpacity  onPress={this.onEmailLogin}> 
       <View 
       style={styles.bigButton}>
       <Text
      style={{
      color:'#ffbb00',
      }}> 
      <Text>
      Login with Email
      </Text>
      </Text> 
       </View>
       </TouchableOpacity>
       <TouchableOpacity  onPress={this.onEmailReg}>
       <View 
       style={styles.regButton}>
       <Text
      style={{
      color:'#6b38a5',
      }}> 
      <Text>
      Register with Email
      </Text>
      </Text> 
       </View>
       </TouchableOpacity>
        <TouchableOpacity  onPress={this.onTerms}> 
       <View 
       style={{
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'white',
        marginHorizontal: 10,
        height: 40
        }}>
            <Text
            style={{
            color:'white',
            }}> 
            <Text>
            Terms & Conditions 
            </Text>
            </Text>
       </View>
       </TouchableOpacity>
    </View>
    </View>
      </Modal>
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


export const loginReducer = (state,action) => {
    switch(action.type) {
        case 'OPEN_LOGIN':
            return { ...state, modalVisible : true}
            break;
        case 'CLOSE_LOGIN':
            return { ...state, modalVisible : false}
            break;
        default:
            return {...state, modalVisible : false};
    }
  }
