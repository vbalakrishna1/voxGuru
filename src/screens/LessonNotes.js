import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from '../Component/Header';


export default class LessonNotes extends Component {
    constructor(props) {
    super(props);
    this.ref = null;
    this.unsubscribe = null;
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
  
    this.state = {
      height: height,
      width: width,
      user: {},
      };
  };


  componentWillMount() {

  };
  componentWillUnmount() {
    // Remember to remove listener
    // Remember to unsubscribe firebase db.
  };


  render() {
    // console.log(this.props.navigation.state.params.lessonText)
    return (
      <View style={{flex: 1}}>
      <Header title={'Lesson Notes'} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())}/>      
      <ScrollView style={{flex: 1}}>
                    <View style ={{borderWidth: 2, borderColor: "#f1f1f1", borderRadius: 8, padding: 10,}}>
            <View style= {{flex: 1, flexDirection: 'column', padding: 5, alignItems: "flex-start",  elevation:4}}>
              <View style= {{flex: 1, flexDirection: 'row', padding: 5, alignItems: "flex-start"}}>
                    <View style = {{borderWidth: 1, borderColor: "grey", borderRadius: 8, padding: 10}}>
                    <Icon name = "music-note" color ="#ffbb00" size={48}/>
                    </View>
                    <View style= {{flex: 1,padding: 10, flexDirection: 'column', alignContent:"center", flexWrap: "wrap"}}>
                    <Text numberOfLines={2} style = {{flex: 1,fontSize: 18, textAlign: 'left', paddingTop: 10, flexWrap: "wrap"}}> {this.props.navigation.state.params.lessonName}</Text>
                    </View>
              </View>
              <HTMLView
                value={this.props.navigation.state.params.lessonText}
                stylesheet={styles}
              />
              </View>
            </View>
      </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  h4: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
  },
  div: {
    fontSize: 14,
    fontFamily: "Nunito-Regular",
  },
  td: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});