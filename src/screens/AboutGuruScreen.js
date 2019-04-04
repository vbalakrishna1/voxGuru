import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Header from '../Component/Header';

import HTMLView from 'react-native-htmlview';

const width = Dimensions.get('window').width;
export default class AboutGuru extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.unsubscribe = null;
    this.dataSource = {};

    this.state = {
      isLoading: true
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
       <Header title={`About ${this.props.navigation.state.params.guruName}`} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())}/>
      <ScrollView>
        <View>
            <View  style={{
              flex: 0.2,
              flexWrap: 'wrap',
              flexDirection: 'column',
              borderBottomWidth: 1, 
              paddingVertical: 30,
              padding: 10,
              borderBottomColor : '#dbdbdb'
            }}>
          {/*<Text style={{color:'black',fontSize: 12, textAlign: 'left', padding: 5, flexWrap: 'wrap'}}>Selected option: {val} </Text>*/}
          <View style={{
              flex: 1,
              flexWrap: 'nowrap',
              flexDirection: 'row',
            }}>
                  <Image 
            style={{
                    flex: -1,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: 'cover',
            }}
      source={{uri:this.props.navigation.state.params.guruThumbnail}}
      /> 
      <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'column',
              paddingLeft: 10,
              justifyContent: "center",
            }}>
      <Text style={{color:'black',fontSize: 16, textAlign: 'left', fontFamily: "Nunito-Bold", padding: 5, flexWrap: 'wrap'}}> 
      {this.props.navigation.state.params.guruName} {this.props.navigation.state.params.guruSurName}
            </Text>
            <Text style={{color:'black',fontSize: 14, fontFamily: "Nunito-Regular", textAlign: 'left', padding: 5, flexWrap: 'wrap'}}> 
        {this.props.navigation.state.params.guruDesignation}
            </Text>
                  <Text style={{color:'black',fontSize: 14, textAlign: 'left', paddingLeft: 5 , flexWrap: 'wrap'}}> 
        {this.props.navigation.state.params.guruEmail}
            </Text>
      </View>
          </View>
          </View>
                 <View style={{flex: 0.8, flexDirection: "column", padding: 10 }}>
          <HTMLView
            value={this.props.navigation.state.params.guruAbout}
            stylesheet={styles}
          />
      </View>
        </View>
      </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fefefe"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }, 
    h4: {
    fontSize: 20,
    fontWeight: "600",
    padding: 5,
    fontFamily: "Nunito-Regular"
  },
  div: {
    fontSize: 14,
    padding: 5,
    fontFamily: "Nunito-Regular",
    color: "#333333"
  },
    bigButton: {
        width: width*0.8,
        alignItems: 'center',
        backgroundColor: '#6b38a5',
        margin: 5,
        height: 40,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0.3,}
  },
});