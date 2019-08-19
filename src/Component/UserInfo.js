import React, { Component } from 'react';
import {TouchableOpacity, Text, FlatList, View, Button, Alert, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import {StyledHeader, StyledTouchableOpacity, StyledText,AlignedText, StyledLeftBox,StyledBackIcon, StyledCenterBox, StyledMenuIcon} from '../UI/index';

import { TextField }from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';


class UserInfo extends Component {
    constructor(props) { 
        super(props);
        console.log(this.props.user);
        this.state={
            name:'',
            email: '',
            phone: '',
            button: -1,
        }

        this.emailRef = this.updateRef.bind(this, 'email');
        this.nameRef = this.updateRef.bind(this, 'name');
        this.phoneRef = this.updateRef.bind(this, 'phone');
    
      }

      
      updateRef (name, ref) {
        this[name] = ref;
      }


      onSubmit =() =>{


        
        if( this.name.value()&&this.email.value()&&this.phone.value() ){
            this.props.userInfoSubmit(this.state)
        }else{
            // 

            Alert.alert(
                'Oops!',
                'Please fill all the details',
                [
                  {text: 'OK', onPress: () => console.log("this is working"), style: 'cancel'},
                ],
                { cancelable: false }
              )
        }
       
      }


      render() {
          const {email, phone,name} = this.state;
          return(
            <ScrollView style={{padding: 10}}>

                        <View style={{
                backgroundColor: "#ffbc00",
                padding: 10,
                margin: 10,
                borderRadius: 4,
                shadowColor: "#000000",
                shadowOpacity: 0.3,
                shadowRadius: 1,
                shadowOffset: {
                height: 1,
                width: 0.3,}}}>
            <AlignedText  selfalign={"Center"} textalign={"Center"}>Thank you for your interest in</AlignedText>
            <AlignedText selfalign={"Center"} textalign={"Center"} size={"Large"}>{this.props.params.info.currentLevelName}</AlignedText>
            <AlignedText selfalign={"Center"} textalign={"Center"}>Please Confirm details for payment {'\n'} of {this.props.planSelected.label}</AlignedText>          
            </View>

             {/* Name */}
                <TextField
                    ref={this.nameRef}
                    label='Name'
                    value={name}
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='next'
                    onChangeText={ (name) => this.setState(prevState =>({ name, button:prevState.button+1 })) }
                    />
            {/* Email */}
                <TextField
                    ref={this.emailRef}
                    label='Email Id'
                    value={email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='next'
                    onChangeText={ (email) => this.setState(prevState =>({ email, button:prevState.button+1 })) }
                    />
            {/* phone */}

                <TextField
                    ref={this.phoneRef}
                    label='Phone Number'
                    value={phone}
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                    onChangeText={ (phone) => this.setState(prevState =>({ phone, button:prevState.button+1 })) }
                    />

            {
            this.state.button > 2 && 
            <View style={{paddingVertical:10}}>
            <Button onPress={()=>this.onSubmit()}
                title="Submit"
                color="#6b38a5"
                accessibilityLabel="Submit payment request"
            />
            </View>
            }    
              </ScrollView>
          )
      }

}

const mapStateToProps = state => ({
    user: state.user.info,
  });
  
  const mapDispatchToProps = dispatch => ({

  });

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);