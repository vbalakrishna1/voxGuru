import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ScrollView, Image, ActivityIndicator, ListView, Modal, Linking, Alert, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from '../Component/Header';
import { connect } from 'react-redux'
import UserAvatar from 'react-native-user-avatar'
import gravatar from 'gravatar';
import moment from 'moment';
import axios from 'axios';
import { StyledContainer, StyledImageContainer, StyledListContainer, StyledVideoBar, StyledText, StyledButton, StyledBox, StyledFloatBar, SmallButton, AlignedText, StyledImageCard, Button } from '../UI';


class MyAccountScreen extends Component {
  constructor(props) {
    super(props);
    console.log("My Account");
    this.ref = null;
    this.unsubscribe = null;
    this.dataSource = {};
    this.listView = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      user: {},
      info: {},
      lessonStatus: null,
      transactionHistory: [],
      animating: true,
      allCourse: []
    }
  }


  componentDidMount() {

    this.setState({
      user: this.props.user,
      info: this.props.user.user.info,
      animating: false
    });
    
    console.log('---info', this.props.user)
    if (this.props.user.user.LessonStatus != {}) {
      this.setState({
        lessonStatus: this.props.user.user.LessonStatus,
        transactionHistory: this.props.user.user.TransactionHistory,
      });
    }
    this.getMyAccountData(this.props.user.user.email);

  };

  getMyAccountData = (email) => {
    console.log("EMAIL++>", email)
    try {
      let reqData = {
        "email": email
      };

      axios.post("https://app.voxguru.in/api/my_account.php", reqData)
                      .then((dataApi) =>{
        console.log("data===>",dataApi)
      if(dataApi.data !=null){
        this.setState({
          transactionHistory: dataApi.data.billing_history
        });
      } else {
        Alert.alert("Sorry!","No transactions found.");
      }
      });
      
    } catch (err) {
      console.log(err);
      Alert.alert("Opps!","Something went wrong please try again.");
      
    }
  }

  componentWillMount() {
    var self = this;

    firebase.database().ref().child('courses').on('value', this.handleUpdate);

  }
  componentWillUnmount() {
    // Remember to remove listener
    // Remember to unsubscribe firebase db.
  };


  handleUpdate = (snapshot) => {
    if (snapshot.val()) {
      this.dataSource = snapshot.val() || {};
      this.setState({ allCourse: this.dataSource })
    } else {
      // this.setState({email:" ", phone:" " });
    }
  }

  _renderUserInfo() {
    let Img;
    if (this.state.info.profileThumbnail) {
      Img = this.state.info.profileThumbnail
    } else {
      Img = gravatar.url(this.state.info.email, { s: '100', r: 'x', d: 'identicon' }, true)
    }
    return (
      <View style={{ width: '100%', padding: 8, paddingTop: 20 }}>
        <View style={{ backgroundColor: "#FFFFFF", padding: 10, paddingLeft: 20, borderRadius: 4 }}>
          <Text style={{ color: "#6b38a5", fontSize: 18, fontWeight: "600", textTransform: "uppercase", marginBottom: 5 }}>Login Details</Text>
          <Text style={{ color: "#000000", fontSize: 18, fontWeight: "200" }}>{this.props.user.user.email}</Text>
        </View>
      </View>
    );
  }



  _renderReNewModal() {
    return (
      null
    )
  }



  _renderLogin() {
    return (
      <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center' }}>
        <Text> Please Login, to see your Account Info </Text>
        <Text style={{ flex: -1, paddingTop: 20, textAlign: 'center' }}>Loading...</Text>
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

    // <View>
    //   {this.state.transactionHistory ?
    //     <View style={{
    //       paddingHorizontal: 10,
    //       paddingVertical: 20,
    //       alignItems: "center",
    //     }}>
    //       <Text> No transactions yet. </Text>
    //     </View>
    //     :
    //     <View style={{
    //       flex: 1,
    //       padding: 10,
    //     }}>
    //       <FlatList
    //         data={Object.values(this.state.transactionHistory)}
    //         renderItem={({ item, index }) => this._renderTransactionRow(item)}
    //         keyExtractor={item => item.txnid}
    //       />
    //     </View>
    //   }
    // </View>
    return (
      <View>
        {this.state.transactionHistory ? (
          <View style={{ width: '100%', padding: 8, paddingTop: 10 }}>
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 4 }}>
              <View style={{ padding: 10, paddingLeft: 20, paddingBottom: 0 }}>
                <Text style={{ color: "#6b38a5", fontSize: 18, fontWeight: "600", textTransform: "uppercase", marginBottom: 10 }}>Billing</Text>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <FlatList
                  data={this.state.transactionHistory}
                  renderItem={({ item, index }) => this._renderTransactionRow(item)}
                  keyExtractor={item => item.subscription_start_date_time + item.course_name}
                />
              </View>
            </View>
          </View>
        ) : (
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
              alignItems: "center",
            }}>
              <Text> No transactions yet. </Text>
            </View>
          )
        }
      </View>
    )
    // if (this.state.transactionHistory == undefined) {
    //   return (
    //     <View style={{
    //       paddingHorizontal:10,
    //       paddingVertical: 20,
    //       alignItems: "center",
    //     }}>
    //       <Text> No transactions yet. </Text>
    //     </View>
    //   )
    // } else if (this.state.transactionHistory == []){
    //   return (
    //     <View style={{
    //       flex: 1,
    //       padding: 10,
    //     }}>
    //       <Text>No transactions yet. </Text>
    //     </View>
    //   )
    //   }
    //  else {
    //   return (
    //     <View style={{
    //       flex: 1,
    //       padding: 10,
    //     }}>
    //       <FlatList
    //         data={Object.values(this.state.transactionHistory)}
    //         renderItem={({ item, index }) => this._renderTransactionRow(item)}
    //         keyExtractor={item => item.txnid}
    //       />
    //     </View>
    //   )
    // }
  }

  _renderTransactionRow = (rowData) => {

    /* if (rowData.txnid) { */

    //let day = moment(rowData.createDate.getDate());
    // let day = rowData.createDate.getDate();
    // let month = rowData.createDate.getMonth();
    // let year = rowData.createDate.getFullYear().toString().slice(-2);

    let serviceProvider = rowData.service_provider;
    let iOS = false;

    let amount = rowData.amount;
    let amountText = "Android 1 month subscription";

    if (serviceProvider === "payuBiz") {
      iOS = false;
    } else {
      iOS = true;
    }

    if (amount <= 1000 && iOS === false) {
      amountText = "Android 1 month subscription";
    } else if (amount > 1000 && amount <= 1500 && iOS === false) {
      amountText = "Android 2 month subscription";
    } else if (amount > 1500 && iOS === false) {
      amountText = "Android 3 month subscription";
    }
    /* {day}/{month}/{year} */
    return (
      <View style={{ paddingTop: 10, paddingBottom: 10, borderBottomColor: "#E0E0E0", borderBottomWidth: 1 }}>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', flex: 1 }}>
            <Text style={{ justifyContent: "flex-start", fontSize: 18, fontWeight: "600", color: "#000000" }}>{moment(rowData.purchase_date_pst, 'DD/MM/YYYY hh:mm').format("DD/MM/YYYY")}</Text>
            <View style={{ flex: 1 }}></View>
            <Text style={{ justifyContent: "flex-end", fontSize: 18, fontWeight: "600", color: "#000000" }}>{rowData.purchase_currency+" "+ rowData.course_fee_amount_paid}</Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>{rowData.course_name}</Text>
          <Text style={{ fontWeight: 'bold' }}>{rowData.subscription_info}</Text>
          {/* {iOS ? ( <Text>IOS auto-renewable subscription</Text> ) : ( <Text>{amountText}</Text> )}
          <Text numberOfLines={1}>Txn id - {rowData.txnid}</Text> */}
          <Text ><Text style={{ fontWeight: 'bold' }}>Subscription Start Date:</Text>{` ${moment(rowData.subscription_start_date_time, 'DD/MM/YYYY hh:mm').format("DD/MM/YYYY")}`}</Text>
          <Text ><Text style={{ fontWeight: 'bold' }}>Subscription End Date:</Text>{` ${moment(rowData.subscription_end_date_time, 'DD/MM/YYYY hh:mm').format("DD/MM/YYYY")}`}</Text>
          <Text ><Text style={{ fontWeight: 'bold' }}>Txn_id: </Text>{rowData.txn_id}</Text>
        </View>
      </View>
    )
    /* } else {
      return null;
    } */

  } // var rowHash = Math.abs(hashCode(rowData));
  getCoursemodule = (courseId) => {
    if (this.dataSource.length != 0) {
      for (let i = 0; i < this.dataSource.length; i++) {
        var levels = Object.values(this.dataSource[i].Levels)
        for (let j = 0; j < levels.length; j++) {
          if (courseId == levels[j].levelId) {
            return levels[j]
          }
        }
      }
    }
  }
  _renderCourseRow = (rowData, sectionID, rowID) => {
    let Coursemodule = this.getCoursemodule(rowData.currentLevelId)
    var CurrentDate = new Date();
    if (Coursemodule) {
      if (Coursemodule.hideCourse == 1) {
        return (
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
              width: 0.3,
            }
          }}>
            <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignContent: 'space-between',
            }}>
              <Image
                style={{
                  width: 100, height: 100, resizeMode: 'cover',
                  borderRadius: 2,
                  borderColor: 'grey',
                  shadowColor: "#000000",
                  shadowOpacity: 0.3,
                  shadowOffset: {
                    height: 1,
                    width: 0.3,
                  }
                }}
                source={{ uri: rowData.currentLessonPHI }}
              />
              <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignContent: 'center',
                alignSelf: 'center',
                paddingHorizontal: 10
              }}>

                <Text style={{ color: "black", textAlign: 'left', flexWrap: 'wrap' }}>
                  <Text>
                    {rowData.currentLevelName}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )
      } else {
        if (rowData.endDate - CurrentDate <= 0) {
          return (
            <TouchableHighlight onPress={() => this.props.openPay(rowData.currentLevelId)} underlayColor={'yellow'}>

              <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'space-between', backgroundColor: '#fefefe', margin: 5, borderColor: '#e5e5e5', borderWidth: 1, borderRadius: 4, shadowColor: "#000000", shadowOpacity: 0.3, shadowOffset: { height: 1, width: 0.3, } }}>
                <View style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                }}>
                  <Image
                    style={{
                      width: 100, height: 100, resizeMode: 'cover',
                      borderRadius: 2,
                      borderColor: 'grey',
                      shadowColor: "#000000",
                      shadowOpacity: 0.3,
                      shadowOffset: {
                        height: 1,
                        width: 0.3,
                      }
                    }}
                    source={{ uri: rowData.currentLessonPHI }}
                  />
                  <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                    alignContent: 'center',
                    alignSelf: 'center',
                    paddingHorizontal: 10
                  }}>

                    <Text style={{ textAlign: 'left', flexWrap: 'wrap' }}>
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
                      <Text style={{ color: "#ffbb00", textAlign: 'center' }}>
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
                width: 0.3,
              }
            }}>
              <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignContent: 'space-between',
              }}>
                <Image
                  style={{
                    width: 100, height: 100, resizeMode: 'cover',
                    borderRadius: 2,
                    borderColor: 'grey',
                    shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowOffset: {
                      height: 1,
                      width: 0.3,
                    }
                  }}
                  source={{ uri: rowData.currentLessonPHI }}
                />
                <View style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  alignContent: 'center',
                  alignSelf: 'center',
                  paddingHorizontal: 10
                }}>

                  <Text style={{ color: "black", textAlign: 'left', flexWrap: 'wrap' }}>
                    <Text>
                      {rowData.currentLevelName}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

          );
        }

      }


    }




  }


  onRenew = (rowData) => {
    var navigateAction = NavigationActions.navigate({

      routeName: 'RenewPayment',

      params: { data: { amount: rowData.amount, productInfo: `Course: ${rowData.currentLevelName}`, firstname: this.state.user.firstname, phone: this.state.user.phone, email: this.state.user.email }, levelId: rowData.currentLevelId }

    })
    this.props.navigation.dispatch(navigateAction);
  }


  _renderCourses(val) {

    if (this.state.lessonStatus) {
      return (
        <View>
          <FlatList
            data={Object.values(this.state.lessonStatus)}
            renderItem={({ item, index }) => this._renderCourseRow(item)}
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
    switch (this.state.selectedCustomSegment) {
      case 0:
        var val = 'Course History';
        return this._renderCourses();
      case 1:
        var val = 'Transaction History';
        return this._renderTransaction();
      default:
        var val = 'Transaction History';
        return this._renderTransaction();
    }

  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedCustomSegment: index,
    });
  }
  _renderCustomSegmentControlClone() {

    function setSelectedOption(option) {
      this.setState({
        selectedCustomSegment: option,
      });
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title={"My Account"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} center={true} />
        <ScrollView style={{ backgroundColor: "#E0E0E0" }}>
          {this._renderUserInfo()}
          {/* <View style={{ height: 10 }} />
          <ActivityIndicator animating={this.state.animating} />
          <SegmentedControlTab
            values={['Transaction History']}
            selectedIndex={this.state.selectedCustomSegment}
            onTabPress={this.handleIndexChange}
            borderRadius={0}
            tabsContainerStyle={{ height: 50, backgroundColor: '#6b38a5', borderTopWidth: 1, borderTopColor: "white", }}
            tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, flexWrap: "wrap" }}
            activeTabStyle={{ backgroundColor: 'white', marginTop: 2, }}
            tabTextStyle={{ color: '#444444', fontSize: 14, }}
            activeTabTextStyle={{ color: '#6b38a5', fontSize: 14 }} /> */}
          <View style={{ flex: 1 }}>
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


    firebase.database().ref().child('levels').child(val).once('value')
      .then(function (snapshot) {
        if (snapshot.val()) {
          let dataSource = snapshot.val() || {};
          // console.log(snapshot.val());
          dispatch({ type: 'OPEN_PAY', params: dataSource });
        } else {
          Alert.alert(
            'Error..! Server did not respond',
            'Try again',
            [
              { text: 'OK', onPress: () => console.log("Error"), style: 'cancel' },
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
  }, bigButton: {
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
      width: 0.3,
    }
  }
});