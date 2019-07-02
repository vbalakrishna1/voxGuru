import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Platform,
  ScrollView,
  ActivityIndicator,
  PixelRatio,
  FlatList,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  Modal,
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import { StyledText, AlignedText } from '../UI';
import Header from '../Component/Header';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
     text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
      bigButton: {
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
  }
});

class Subscribe extends Component {
    constructor(props){
    super(props);
    this.ref = null;
    let {height, width}  = Dimensions.get('window');

    this.state={
      isLoading:true,
      data:null
    }
  }

    componentDidMount() {
      this.ref = firebase.database().ref();
      var self = this;
      this.ref.child('QuickSub').once('value')
      .then(function(dataSnapshot) {
        if(dataSnapshot.val()){
        var data = dataSnapshot.val();
        self.setState({data, isLoading:false})
        }
      })
      .catch(err =>{
        console.log(err);
      });


  };
  componentWillUnmount() {
    // Remember to remove listener
    // Remember to unsubscribe firebase db.
    if (this.ref) {
      this.ref.off('value', this.handleUpdate);
    }
  };


    handleUpdate = (snapshot) => {
    if(snapshot.val()){
        this.dataSource = snapshot.val() || {};
        this.setState({
        firstname: this.dataSource.userName,
        email: this.dataSource.email,
        phone:this.dataSource.phone,
        isLoading: false,
        });
    } else {
        // this.setState({email:" ", phone:" " });
        }
   }


   _renderRow = (obj) => {
    console.log(obj.item);
    let rowData = obj.item;
    return (
      <TouchableOpacity onPress={() => this._showModal(rowData)}>
      <View style={{elevation:1, borderRadius: 4,flexDirection:"row" , justifyContent:"center" , flexWrap: "nowrap", marginVertical:5, marginHorizontal:10}}>
        <Image source = {{ uri: rowData.thumbNail }} style={{width: 100, aspectRatio : 1, borderTopLeftRadius: 2, borderBottomLeftRadius:2}} />
        <View style={{justifyContent:"center", padding:5, flexWrap:"wrap", flex:1}}>
        <AlignedText size={"Large"} weight={"SemiBold"}>{rowData.courseName}</AlignedText>
        <AlignedText size={"Small"} textalign={"Justify"} color={"Grey"}>{rowData.courseDescription}</AlignedText>
        </View>
      </View>
      </TouchableOpacity>
     );
   } 

   _showModal = (rowData) => {
    console.log(rowData);
    this.props.openPay(rowData.levelId);
}

_hideModal = () => this.setState({ modalVisible: false})

  render() {
    if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 20 ,justifyContent: 'center'}}>
        <ActivityIndicator 
        size={'large'}
        color={'black'}/>
        <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading...</Text>
      </View>
    );
   } else {
   return (
    <View style={{flex:1}}>
    <Header title={"Subscribe"} leftNavMenu={true} leftNavFunc={this.props.openMenu}/>
    <ScrollView style={{flex:1}}>
              <View
              style={{
        backgroundColor: "#ffbc00",
        padding: 10,
        margin: 10,
        borderRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0.3,}
      }}
        > 
          <Text
          style={{ textAlign:"center", color: "#333333"}}
          > <Text>Welcome to Quick Subscribe!</Text></Text>
        </View>


   <View style={{
        borderRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0.3,}}}>
   <Text style={{paddingHorizontal: 7.5, fontSize: 72/4, fontFamily: "Nunito"}}> Our Courses</Text>
   <FlatList 
    data={this.state.data}
    renderItem={(item) => this._renderRow(item)}
    keyExtractor={(item, index) => item.levelId}
   />
   </View>
  </ScrollView>
</View>
   )

  }
}
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

  openMenu: () => {
    dispatch(NavigationActions.navigate({routeName:'DrawerOpen' }))
  },

  openPay: (val) => {
    // dispatch({type:'OPEN_LOGIN', params})

    firebase.database().ref().child('levels').child(val).once('value')
    .then(function(snapshot){
      if(snapshot.val()){
        let dataSource = snapshot.val() || {};
        // console.log(snapshot.val());
        dispatch({type: 'OPEN_PAY', params:dataSource });
      } else {
        Alert.alert(
          'Error..! Server did not respond',
          'Try again',
          [
            {text: 'OK', onPress: () => console.log("Error"), style: 'cancel'},
          ],
          { cancelable: true }
        )
      }
    });
  } ,

});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);