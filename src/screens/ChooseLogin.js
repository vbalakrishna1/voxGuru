// import React from 'react';
// import {
//    StyleSheet,
//    Text,
//    View,
//    Button,
//    Image,
//    ScrollView,
//    TouchableHighlight,
//    TouchableOpacity,
//    Platform,
//    ActivityIndicator,
//    Dimensions,
//    Modal,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
// import Header from '../Component/Header';

// class ChooseLogin extends React.Component {
//    onEmailLogin = () => {
//       this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }));
//       // this.props.dispatch(NavigationActions.navigate({ routeName: 'ChooseLogin' }));

//    }

//    onEmailReg = () => {
//       this.props.dispatch(NavigationActions.navigate({ routeName: 'RegisterScreen' }), this.closeModal());
//    }

//    render(){
//       return(

//          <View style={{ flex: 1 }}>
// <Header title={"Login with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
// <View style={{ justifyContent: "center", alignItems: "center", height: '100%' }}>
//    <TouchableOpacity onPress={this.onEmailLogin}>
//       <View
//          style={styles.bigButton}>
//          <Text
//             style={{
//                color: '#ffffff',
//             }}>
//             <Text style={{ fontFamily: "Nunito-Bold" }}>Login with Email</Text>
//          </Text>
//       </View>
//    </TouchableOpacity>
//    <Text>fnerfbherjfi</Text>
// </View>
//       </View>
//       )
//    }

// }



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



import React from 'react';
import { View, TouchableOpacity, Alert, ToastAndroid, StyleSheet, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';
import { StyledText, AlignedText, StyledContainer, StyledBox } from '../UI';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import firebase from 'react-native-firebase';


class CLogin extends React.Component {

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

   render() {
      let { email, secureTextEntry, password } = this.state;
      return (
         <StyledContainer>
            <Header title={"Login with Email"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
            <View style={{ justifyContent: "center", alignItems: "center", height: '100%'}}>
               <TouchableOpacity onPress={this.props.onEmailRegister} style={{width:'100%'}}>
                  <View
                     style={styles.bigButton}>
                     <Text
                        style={{
                           color: '#ffffff',paddingVertical:10
                          
                        }}>
                        <Text style={{ fontFamily: "Nunito-Bold" }}>New User?</Text>
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={this.props.onEmailLogin} style={{width:'100%'}}>
                  <View
                     style={styles.bigButton}>
                     <Text
                        style={{
                           color: '#ffffff',paddingVertical:10
                        }}>
                        <Text style={{ fontFamily: "Nunito-Bold" }}>Already a User?</Text>
                     </Text>
                  </View>
               </TouchableOpacity>

            </View>
         </StyledContainer>
      );
   }
}

const mapStateToProps = state => ({
   ChooseLogin: state.ChooseLogin,
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   onEmailLogin: () => {
      dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }));
   },
   onEmailRegister: () => {
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

export default ChooseLogin = connect(mapStateToProps, mapDispatchToProps)(CLogin);