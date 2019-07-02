'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// import { GiftedChat } from 'react-native-gifted-chat'
import { newOrder } from '../../payU'

export default class TabOneScreenOne extends React.Component {

  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    })
    newOrder.Create({            
      amount: 100,
      productinfo: "test",
      firstname: "Naga",
      email: "durgaprasad814@gmail.com",
      phone: "+919581616262",
      surl: 'https://www.google.com/_success',
      furl: 'https://www.google.com/_failure',
      service_provider: 'payuBiz',
      salt: "vLEDVf0x",
      key: "7dr1rA",
      udf1 : (new Date ()).getTime(),
  }, false /* === test payment*/ );
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render(){
    return(

      <View style={{
        flex:1,
      }}>

    {/* <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          /> */}

      <View style={{
        flex:1,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Tab One Screen One' }</Text>


        <TouchableOpacity
          onPress={ () => this.props.navigation.dispatch({ type:'OPEN_MODAL', payload:"Thats okay" }) }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'yellow',
            marginTop:20
          }}>
          <Text>{'Open Drawer'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('TabOneScreenTwo') }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'yellow',
            marginTop:20
          }}>
          <Text>{'Go to next screen this tab'}</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}
