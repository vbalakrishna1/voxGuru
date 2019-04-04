import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  ActivityIndicator,
  ListView,
  Modal,
  Linking,
  Alert,
  FlatList
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from '../Component/Header';
import { connect } from 'react-redux'
import UserAvatar from 'react-native-user-avatar'
import gravatar from 'gravatar';

import { StyledContainer,
  StyledImageContainer, 
  StyledListContainer,
  StyledVideoBar,
  StyledText,
  StyledButton,
  StyledBox, 
  StyledFloatBar, 
  SmallButton, 
  AlignedText, StyledImageCard, Button} from '../UI';


class MyAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.unsubscribe = null;
    this.dataSource = {};
    this.listView = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      user: {},
      info : {},
      lessonStatus: null,
      transactionHistory: null,
      animating:true
    }
  }


    componentDidMount() {

      this.setState({
        user: this.props.user,
        info: this.props.user.user.info,
        animating:false
      });
      if(this.props.user.user.LessonStatus) {
        console.log('reached here MYAC1');
        this.setState({
          lessonStatus: this.props.user.user.LessonStatus,
          transactionHistory: this.props.user.user.TransactionHistory,
        });
      }

  };
  componentWillUnmount() {
    // Remember to remove listener
    // Remember to unsubscribe firebase db.
  };


    handleUpdate = (snapshot) => {
    if(snapshot.val()){
      this.dataSource = snapshot.val() || {};

    } else {
      // this.setState({email:" ", phone:" " });
      }
  }



  _renderUserInfo () {
    let Img;
    if(this.state.info.profileThumbnail){
      Img = this.state.info.profileThumbnail
    }else {
    Img =  gravatar.url(this.state.info.email, {s: '100', r: 'x', d: 'identicon'}, true)      
    }
    return (
        <View>
            <View  style={{
              flexWrap: 'wrap',
              flexDirection: 'column',
              paddingVertical: 30,
              padding: 10,
            }}>
            <View
            style={{
            position: 'absolute',
            top: 10,
            right: 10,}} >
            <TouchableHighlight
            underlayColor={'yellow'}
            onPress={this.accountEdit}>
        <View>
        
        </View>
        </TouchableHighlight>
        </View>
          <View style={{
              flex: 1,
              flexWrap: 'nowrap',
              flexDirection: 'row',
            }}>
      <UserAvatar size="100" name='No Image' src={Img} />
      <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'column',
              paddingLeft: 10,
              marginTop: 10,
            }}>
      <Text style={{color:'black',fontSize: 28, textAlign: 'left', padding: 5, flexWrap: 'wrap'}}> 
        {this.state.info.userName}
            </Text>
      {/* <Text style={{color:'black',fontSize: 14, textAlign: 'left', padding: 5, flexWrap: 'wrap'}}> 
              Age: {this.state.info.ageText} years | Gender: {this.state.info.genderText}
            </Text> */}
      <Text style={{color:'black',fontSize: 14, textAlign: 'left', paddingLeft: 5 , flexWrap: 'wrap'}}> 
              {this.state.info.email}
            </Text>
      </View>

          </View>
          </View>
        </View>

    );
  }



_renderReNewModal() {
  return (
    null
  )
}

  

  _renderLogin () {
    return (
      <View style={{flex: 1, paddingTop: 20 ,justifyContent: 'center'}}>
        <Text> Please Login, to see your Account Info </Text>
          <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading...</Text>
        </View>
    );
  }

  handleCourseChange = (index) => {
    this.setState({
      ...this.state,
      selectedCourseSegment: index,
    });
  }

  _renderTransaction(val) {
    // console.log(this.state[val]);


    if(this.state.transactionHistory) {
      return (
        <View style={{
          flex: 1,
          padding: 10,
        }}>

                                    <FlatList 
                      data={Object.values(this.state.transactionHistory)}
                      renderItem={({item, index}) => this._renderTransactionRow(item)}
                      keyExtractor={item => item.txnid}
                    />
        </View>
      )
      } else {
        return (
        <View style={{
          paddingVertical: 20,
          alignItems: "center",
        }}>
          <Text> Once you subscribe to a course, you can view your Transactions' here </Text>
        </View>
        )
      }
}

_renderTransactionRow = (rowData, sectionID, rowID) => {

  if(rowData.txnid) {
    return (
      <TouchableHighlight  underlayColor={'yellow'}>
  
        <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignContent: 'space-between',
            backgroundColor: '#fefefe',
            margin: 5,
            borderColor: '#e5e5e5',
            borderWidth: 1,
            borderRadius: 4,
            shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowOffset: {
                    height: 1,
                    width: 0.3,}
            }}>
            <View style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                }}>
                  <View style={{
                          flex: 1,
                          flexWrap: 'wrap',
                          flexDirection: 'column',
                          alignContent: 'center',
                          alignSelf: 'center',
                          paddingHorizontal: 10
                        }}>
  
                  <Text style={{color:'black',textAlign: 'left', flexWrap: 'wrap'}}>
                  <Text>
                    {rowData.txnid}
                  </Text>
                  </Text>
  
  
                  <Text style={{textAlign: 'left', color:'grey', flexDirection:'row', flexWrap: 'wrap'}}> 
                  <Text>
                  Amount: {rowData.amount} , 
                  </Text>
                  {rowData.currentLevelId!=null && 
                    (<Text>
                    Course Id: {rowData.currentLevelId } 
                    </Text>)
                  }
                  {rowData.productinfo!=null && 
                    (<Text>
                    Course Id: {rowData.productinfo } 
                    </Text>)
                  }
                  </Text> 
                  
                  </View>
              </View>
    </View>
  
       </TouchableHighlight>
     );
  } else {
    return null;
  }

 } // var rowHash = Math.abs(hashCode(rowData));

 _renderCourseRow = (rowData, sectionID, rowID) => {
    console.log(rowData);
    var CurrentDate = new Date();
    if (rowData.endDate - CurrentDate <= 0) {
      return (
        <TouchableHighlight onPress={() => this.props.openPay(rowData.currentLevelId)} underlayColor={'yellow'}>
          <View style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignContent: 'space-between',
              backgroundColor: '#fefefe',
              margin: 5,
              borderColor: '#e5e5e5',
              borderWidth: 1,
              borderRadius: 4,
              shadowColor: "#000000",
                      shadowOpacity: 0.3,
                      shadowOffset: {
                      height: 1,
                      width: 0.3,}
              }}>
              <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignContent: 'space-between',
                  }}>
                        <Image 
                    style={{width: 100, height: 100, resizeMode: 'cover',
                            borderRadius: 2,
                            borderColor: 'grey',
                            shadowColor: "#000000",
                            shadowOpacity: 0.3,
                            shadowOffset: {
                            height: 1,
                            width: 0.3,}
                            }}
                    source={{uri:rowData.currentLessonPHI}} 
                    /> 
                    <View style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            alignContent: 'center',
                            alignSelf: 'center',
                            paddingHorizontal: 10
                          }}>
    
                    <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>
                    <Text>
                      {rowData.currentLevelName}
                    </Text>
                    </Text>

                    <View style={{
                      borderRadius: 4,
                      borderColor: '#e5e5e5',
                      backgroundColor: '#6b38a5',
                      borderWidth: 1,
                      flex: 0.3,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      maxHeight: 30,
                     }}>
                  <Text style = {{color: "#ffbb00", textAlign: 'center'}}> 
                    <Text>
                    Course Expired!!! Renew now
                    </Text>
                    </Text>
                </View>


                    </View>
                </View>
      </View>
    
         </TouchableHighlight>
       );
    } else {
      return (
        <TouchableHighlight underlayColor={'yellow'} onPress={() => this.props.openPay(rowData.currentLevelId)}>
          <View style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignContent: 'space-between',
              backgroundColor: '#fefefe',
              margin: 5,
              borderColor: '#e5e5e5',
              borderWidth: 1,
              borderRadius: 4,
              shadowColor: "#000000",
                      shadowOpacity: 0.3,
                      shadowOffset: {
                      height: 1,
                      width: 0.3,}
              }}>
              <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignContent: 'space-between',
                  }}>
                        <Image 
                    style={{width: 100, height: 100, resizeMode: 'cover',
                            borderRadius: 2,
                            borderColor: 'grey',
                            shadowColor: "#000000",
                            shadowOpacity: 0.3,
                            shadowOffset: {
                            height: 1,
                            width: 0.3,}
                            }}
                    source={{uri:rowData.currentLessonPHI}} 
                    /> 
                    <View style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            alignContent: 'center',
                            alignSelf: 'center',
                            paddingHorizontal: 10
                          }}>
    
                    <Text style={{ color: "black", textAlign: 'left', flexWrap: 'wrap'}}>
                    <Text>
                      {rowData.currentLevelName}
                    </Text>
                    </Text>
                    </View>
                </View>
      </View>
    
         </TouchableHighlight>
       );
    }

   }


   onRenew = (rowData) => {
    var navigateAction = NavigationActions.navigate({

    routeName: 'RenewPayment',

    params:{data:{amount: rowData.amount, productInfo: `Course: ${rowData.currentLevelName}`, firstname: this.state.user.firstname, phone: this.state.user.phone, email: this.state.user.email }, levelId: rowData.currentLevelId}

    })
    this.props.navigation.dispatch(navigateAction);
  }
   

_renderCourses(val) {
  // console.log(this.state[val]);
  
    if(this.state.lessonStatus) {
      return (
        <View>
            <FlatList 
            data={Object.values(this.state.lessonStatus)}
            renderItem={({item, index}) => this._renderCourseRow(item)}
            keyExtractor={item => item.currentLevelId}
          />
        </View>
      )
      } else {
        return (
        <View style={{
          flex: 1,
          paddingVertical: 20,
          alignItems: "center",
        }}>
          <Text>Once you subscribe, They will be visible here </Text>
  
        </View>
        )
      }
}

_renderCustomSegmentElement() {
  switch(this.state.selectedCustomSegment) { 
  case 0:
        var val = 'Course History';
        return this._renderCourses();
  case 1:
        var val = 'Transaction History';
        return this._renderTransaction();
  default:
      var val = 'Course History';
      // console.log(this.state.Beginner)
      return this._renderCourses();
  }

}
handleIndexChange = (index) => {
  this.setState({
    ...this.state,
    selectedCustomSegment: index,
  });
}
_renderCustomSegmentControlClone(){

  function setSelectedOption(option){
    this.setState({
      selectedCustomSegment: option,
    });
  }
}


  render() {
    console.log(this.state);
      return (
        <View style={{flex:1}}>
        <Header title={"My Account"} leftNavMenu={true} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.navigate({routeName:'DrawerOpen' }))}/>

        <ScrollView style={{backgroundColor:"#fefefe"}}>
        {this._renderUserInfo()}
            <View style={{height: 10}}/>
        <ActivityIndicator animating={this.state.animating}/>
            <SegmentedControlTab
          values={['Courses History', 'Transaction History']}
          selectedIndex={this.state.selectedCustomSegment}
          onTabPress={this.handleIndexChange}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#6b38a5', borderTopWidth: 1, borderTopColor: "white", }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, flexWrap: "wrap"}}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2, }}
          tabTextStyle={{ color: '#444444', fontSize: 14,}}
          activeTabTextStyle={{ color: '#6b38a5' , fontSize: 14}} />
        <View style={{ flex: 1}}>
        {this._renderCustomSegmentElement()}
        </View>
        {/* {this._renderReNewModal()} */}
        </ScrollView>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  openPay: (val) => {

    console.log(val);
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

  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  },  bigButton: {
    alignItems: 'center',
        backgroundColor: '#6b38a5',
        margin: 5,
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