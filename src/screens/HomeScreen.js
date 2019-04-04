import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Alert, StatusBar, ToastAndroid, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Button, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  StyledContainer,
  StyledImageContainer, StyledFullWidthContainer,
  StyledListContainer,
  StyledVideoBar,
  StyledText,
  StyledButton,
  StyledBox,
  StyledFloatBar,
  SmallButton,
  AlignedText, StyledImageCard
} from '../UI';
import firebase from 'react-native-firebase';
import Header from '../Component/Header';
import TopCard from '../Component/TopCard';
import Card from '../Component/Card';
import * as Progress from 'react-native-progress';

// const debounce = require('lodash.debounce');

import debounce from 'lodash.debounce'


import { newOrder } from '../payU';
import { fail } from 'assert';
const uuid = require('react-native-uuid');
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  list: {
    paddingLeft: 2,
    paddingRight: 20,
    paddingBottom: 20,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5    
  }
});

const { height, width } = Dimensions.get('window');



export class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    let sub = function () {
      if (props.user.userLogin) {
        if (props.user.user.LessonStatus !== null) {
          let LessonStatus = props.user.user.LessonStatus;
          let lessonActiveCount = 0;
          for (const key in LessonStatus) {
            if (LessonStatus.hasOwnProperty(key)) {
              // console.log(key , " -> " , LessonStatus[key]);
              let CurrentDate = new Date().getTime();
              let rowData = LessonStatus[key]
              // console.log(rowData.endDate-CurrentDate);
              if (rowData.endDate - CurrentDate <= 0) {
                // expired courses
                if (rowData.endDate - CurrentDate >= -86400000) {
                  // expired less than a day
                  lessonActiveCount = lessonActiveCount + 1;
                }
              } else {
                lessonActiveCount = lessonActiveCount + 1;
              }
            }
          }
          // console.log(lessonActiveCount);
          if (lessonActiveCount > 0) {
            return true
          }
        }
      }
      return false
    }()
    console.log(sub);
    this.state = {
      user: props.user.user || {},
      ui: props.appUi.HomeScreen || {},
      loading: true,
      width: width,
      TopCardAspectRatio: 1.8,
      userLogin: props.user.userLogin,
      isSubscriber: sub
    }
  }

  componentWillReceiveProps(nextProps) {
    let { appUi, user } = nextProps;
    let isSubscriber = null
    if (user.user.LessonStatus !== null) {
      let temp = user.user;
      let LessonStatus = temp.LessonStatus;
      // console.log('LessonStatus', LessonStatus);
      let lessonActiveCount = 0;
      for (const key in LessonStatus) {
        if (LessonStatus.hasOwnProperty(key)) {
          // console.log(key , " -> " , LessonStatus[key]);
          let CurrentDate = new Date().getTime();
          let rowData = LessonStatus[key]
          // console.log(rowData.endDate-CurrentDate);
          if (rowData.endDate - CurrentDate <= 0) {
            // expired courses
            if (rowData.endDate - CurrentDate >= -86400000) {
              // expired less than a day
              lessonActiveCount = lessonActiveCount + 1;
            }
          } else {
            lessonActiveCount = lessonActiveCount + 1;
          }
        }
      }
      // console.log(lessonActiveCount);
      if (lessonActiveCount > 0) {
        isSubscriber = true
      }
    } else {
      // user has no subscriptions
      isSubscriber = false
    }
    // console.log(isSubscriber);
    this.setState({
      userLogin: user.userLogin, user: user.user, ui: appUi.HomeScreen || {},
      isSubscriber,
    });
  }

  componentDidUpdate(prevState, prevProps) {
    const { user } = prevState;

  }

  componentDidMount() {
    // console.log(this.state);
    Dimensions.addEventListener('change', this._handleChange);
  }

  componentWillUnmount() {
    Dimensions.addEventListener('change', this._handleChange);
  }

  _handleChange = (change) => {
    this.setState({ width: change.window.width, TopCardAspectRatio: (change.window.width > change.window.height ? 2 : 1.8) });
  }
  renderItem = ({ item, index }) => {
    // console.log(item,index );
    return (
      <StyledImageCard id={item.courseId} >

        <TouchableOpacity onPress={
          debounce(() => this.props.openCourse(item.courseId, item.courseTitile), 1000, { leading: true, trailing: false })}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={item.gradients} style={styles.linearGradient}>
            <Card id={item.courseId} item={item} width={this.state.width} />
          </LinearGradient>
        </TouchableOpacity>

      </StyledImageCard>
    )
  }

  onLogout = (email, password) => {
    firebase.auth().signOut()
      .then(() => {
        ToastAndroid.show(`Log out success`, ToastAndroid.LONG);
      }).catch((error) => {
        console.log(error);
        ToastAndroid.show("error", ToastAndroid.LONG);
      })
  }

  dateDiff = (date1, date2) => {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1;
    var date2_ms = date2;

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var hours = Math.floor(difference_ms % 24);
    var days = Math.floor(difference_ms / 24);

    if (days === 0) {
      return 'Only ' + hours + ' hours, and ' + minutes + ' minutes ' + seconds + ' seconds';
    } else {
      return days + ' days';
    }

    if (isNaN(days)) {
      return false
    }

  }

  _renderProgress = (progressState) => {


    if (progressState < 1 && progressState > 0) {
      return (
        <View style={{ paddingLeft: 2, paddingBottom: 5 }}>
          <Progress.Bar color={'rgba(107, 56, 165, 1.0)'} borderRadius={6} progress={progressState} width={this.props.width * 0.5} height={10} animated={true} />
        </View>
      );
    } else {
      return null
    }
  }

  renderCourseCard = ({ item }) => {
    // console.log(item);
    // console.log(this.props);
    let CurrentDate = new Date().getTime();
    let dateDiff = this.dateDiff(CurrentDate, item.endDate);
    // console.log(item.endDate-CurrentDate);
    if (item.endDate - CurrentDate <= 0) {
      if (item.endDate - CurrentDate >= -86400000) {
        // console.log("expired but less than a day");
        return (
          <View style={{
            flex: 1, justifyContent: "space-between", flexWrap: "nowrap", backgroundColor: "white", elevation: 4, margin: 7.25
          }}>
            <AlignedText size={"Large"} padding={"0px 10px"} weight={"SemiBold"}>{item.currentLevelName}</AlignedText>
            <TouchableOpacity onPress={debounce(() => this.props.onViewAll(item.currentLessonId), 1000, { leading: true, trailing: false })}
              style={{ padding: 5, elevation: 5, margin: 5, }}>
              <View style={{ elevation: 1, width: '100%', borderRadius: 2, flexDirection: "row" }}>
                <Image source={{ uri: item.currentLessonPHI }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
                  <AlignedText size={"Medium"}>{item.currentLessonName}</AlignedText>
                  <View style={{ flex: -1, paddingVertical: 5, marginLeft: -2 }}>
                    {this._renderProgress(item.currentStatusLevel)}
                  </View>
                  <AlignedText size={"Small"}>{item.currentStatus}</AlignedText>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", flexWrap: "nowrap", flex: 1, alignItems: 'center', justifyContent: "space-between", marginHorizontal: 5 }}>
              <AlignedText size={"Medium"} padding={"5px"}>Your course has expired</AlignedText>
              <TouchableOpacity style={{
                borderRadius: 4,
                borderColor: '#e5e5e5',
                backgroundColor: '#6b38a5',
                borderWidth: 1,
                flex: 0.4,
                padding: 5, margin: 5,
                maxHeight: 30, justifyContent: "center", flexWrap: "nowrap",
              }} onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
                <AlignedText color={"HighLight"} weight={"SemiBold"} textalign={"Center"} padding={"2.5px 5px"}>Renew</AlignedText>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        // console.log("expired");
        return null

      }
    } else {
      // console.log("not expired"); 
      return (
        <View style={{
          flex: 1, justifyContent: "space-between", flexWrap: "nowrap", backgroundColor: "white", elevation: 4, margin: 7.25
        }}>
          <AlignedText size={"Large"} padding={"0px 10px"} weight={"SemiBold"}>{item.currentLevelName}</AlignedText>
          <TouchableOpacity onPress={debounce(() => this.props.onViewAll(item.currentLessonId), 1000, { leading: true, trailing: false })}
            style={{ padding: 5, elevation: 5, margin: 5, }}>
            <View style={{ elevation: 1, width: '100%', borderRadius: 2, flexDirection: "row" }}>
              <Image source={{ uri: item.currentLessonPHI }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
              <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
                <AlignedText size={"Medium"}>{item.currentLessonName}</AlignedText>
                <View style={{ flex: -1, paddingVertical: 5, marginLeft: -2 }}>
                  {this._renderProgress(item.currentStatusLevel)}
                </View>
                <AlignedText size={"Small"} textalign={"Justify"}>{item.currentStatus}</AlignedText>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginHorizontal: 5 }}>
            <View style={{ flex: -1 }}>
              <AlignedText size={"Medium"} padding={"1px 5px 5px 5px"}>{dateDiff} left.</AlignedText>
            </View>
            <TouchableOpacity style={{
              borderRadius: 4,
              borderColor: '#e5e5e5',
              backgroundColor: '#6b38a5',
              borderWidth: 1,
              padding: 5, margin: 5,
              maxHeight: 30, justifyContent: "center", minWidth: '20%',
            }} onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
              <AlignedText color={"HighLight"} weight={"SemiBold"} textalign={"Center"} padding={"2.5px 5px"}>Extend</AlignedText>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  render() {
    console.log(this.state);
    return (
      <StyledContainer>
        <Header title={"Home"} leftNavMenu={true} leftNavFunc={this.props.openMenu} />
        <StyledBox contentContainerStyle={{ alignItems: "center" }}>

          {this.props.appUi.HomeScreen && !this.state.isSubscriber ? (
            <StyledImageContainer>
              <TopCard img={this.props.appUi.HomeScreen.CARD}
                openVideo={this.props.openVideo} width={this.state.width}
                TopCardAspectRatio={this.state.TopCardAspectRatio} />
              <StyledVideoBar>
                <StyledText color={"Light"} weight={"SemiBold"}>{this.props.appUi.HomeScreen.CARD.courseTitile}</StyledText>
                <StyledText color={"Light"} weight={"SemiBold"}>{this.props.appUi.HomeScreen.CARD.courseVideoLength}</StyledText>
              </StyledVideoBar>
            </StyledImageContainer>
          ) : null}

          {this.state.isSubscriber ? (
            <StyledFullWidthContainer>
              <FlatList
                keyExtractor={item => item.currentLevelId}
                data={Object.values(this.state.user.LessonStatus)}
                renderItem={this.renderCourseCard}
                extraData={this.state}
              />
            </StyledFullWidthContainer>
          ) : null
          }

          <StyledListContainer>
            <AlignedText padding={"0px 10px"} weight={"SemiBold"}>Our Courses</AlignedText>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={item => item.courseId}
              data={this.state.ui.SECTIONS}
              renderItem={this.renderItem}
              numColumns={2}
              extraData={this.state}
            />
          </StyledListContainer>

        </StyledBox>
        {!this.state.userLogin && (
          <StyledFloatBar>
            <StyledText color={"Light"} weight={"SemiBold"}>Already a user?</StyledText>
            <SmallButton onPress={debounce(() => this.props.openLogin(), 1000, { leading: true, trailing: false })}>
              <AlignedText color={"Light"} weight={"SemiBold"} padding={"2.5px 5px"}>Login</AlignedText>
            </SmallButton>

          </StyledFloatBar>
        )}


      </StyledContainer>
    )
  }
}

HomeScreen.propTypes = {
  appUi: PropTypes.object.isRequired,
  openPay: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  openCourse: PropTypes.func.isRequired,
  openVideo: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appUi: state.appUi,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

  // onLessonUpdate: (object, key, update) =>{
  //   let params = {...object};
  //   params[key] = {...object[key],...update};
  //   console.log(params);
  //   dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
  // },

  openPay: (val) => {

    console.log(val);
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

  openMenu: () => {
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))
  },

  openCourse: (params, courseTitile) => {

    firebase.database().ref().child('courses').child(params).once('value')
      .then(function (snapshot) {
        if (snapshot.val()) {
          let dataSource = snapshot.val() || {};
          // console.log(snapshot.val());
          dispatch(NavigationActions.navigate({ routeName: 'CourseScreen', params: { ...dataSource, courseName: courseTitile } }));
        } else {
          Alert.alert(
            'Error..! Server did not respond',
            'Try again',
            [
              { text: 'OK', onPress: () => this.openCourse() },
              { text: 'Cancel', onPress: () => console.log("Error"), style: 'cancel' },
            ],
            { cancelable: true }
          )
        }
      });

  },

  onViewAll: (val) => {
    console.log(val);
    firebase.database().ref().child('lessons').child(val).once('value')
      .then(function (snapshot) {
        if (snapshot.val()) {
          let dataSource = snapshot.val() || {};
          console.log(snapshot.val());
          dispatch(NavigationActions.navigate({ routeName: 'LessonScreen', params: dataSource }));
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

  openVideo: (params) => {
    dispatch({ type: 'OPEN_VIDEO', params })
  },
  openLogin: (params) => {
    dispatch({ type: 'OPEN_LOGIN', params })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);