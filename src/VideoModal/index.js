'use strict'

// React
import React from 'react'
import {
   Modal, View, Text, Button, Alert, ActivityIndicator,
   TouchableOpacity, ToastAndroid, NetInfo, StyleSheet
} from 'react-native'
//Redux
import { connect } from 'react-redux';
import Voxplayer from '../Component/Voxplayer';
import firebase from 'react-native-firebase';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyledFloatIcon } from '../UI';
import { NavigationActions } from 'react-navigation';
import clear from 'react-native-clear-app-cache'
//import Video from 'react-native-af-video-player'
import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';


var videourl = ''


const mapStateToProps = (state) => {

   return {
      video: state.video,
      user: state.user,
   }
}

var ran = 0;

class VideoModalNavigation extends React.Component {

   constructor(props) {
      super(props);
      let videoId = null


      this.state = {
         modalVisible: false,
         fullscreenstatus: true,
         videoId: (() => {
            let val = props.video.play
            console.log(videoId);
            console.log(val);
            if (val) {
               if (typeof val !== "object") return val;
            } else {
               if (val) return val.videoId;
            }
         })(),
         info: null,
         loaded: false,
         resetAction: null,
         isNoConnected: true,
         isNoConnectedStart: true,
         paused: true,
         displayPoster: true
      };

   }

   componentWillUnmount() {
      console.log("modal unmounted");
      NetInfo.removeEventListener(
         'connectionChange',
         this.handleFirstConnectivityChange
      );
   }

   handleFirstConnectivityChange(connectionInfo) {
      console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
   }

   getVideoInfo = (videoId) => {
      const self = this;
      firebase.database().ref().child('video').child(videoId).once('value')
         .then(function (snapshot) {
            if (snapshot.val()) {
               let info = snapshot.val() || {};
               console.log('snapshot.val()', snapshot.val());
               self.setState({ info });
            } else {
               self.setState({ info: null });
            }
         })
         .catch((error) => {
            console.error(error);
         });
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.video !== this.props.video) {
         if (nextProps.video.modalVisible) {
            this.setState({ modalVisible: true, loaded: false });

         } else {
            this.setState({ modalVisible: false });
         }
         if (nextProps.video.play) {
            if (typeof nextProps.video.play !== "object") {
               this.setState({ videoId: nextProps.video.play });
               this.getVideoInfo(nextProps.video.play);
            } else {
               if (nextProps.video.play.videoId) this.setState({ videoId: nextProps.video.play.videoId });
               this.getVideoInfo(nextProps.video.play.videoId);
            }

         } else {
            this.setState({ videoId: null });
         }

      }
   }
   componentWillUpdate() {
      ran = 0;
   }

   componentWillMount() {
      NetInfo.addEventListener(
         'connectionChange',
         this.handleFirstConnectivityChange
      );
   }

   componentDidMount() {
      // loads at app launch

   }

   closeModal = () => {
      if (this.state.resetAction) {
         return this.state.resetAction;
      } else {
         return { type: 'CLOSE_VIDEO', payload: null }
      }
   }

   onLearnMore = () => {
      this.props.dispatch(this.closeModal());
   }

   onPlayPress = () => {
      console.log("On Play press");
      this.setState(prevState => { loaded: !prevState.loaded });
      this.setState({ isNoConnected: true, paused: false });
      this.setState({ displayPoster: false });
      checkInternetConnection().then(isConnected => {
         if (isConnected) {
            // ToastAndroid.show('Connected', ToastAndroid.SHORT);
            this.setState({ isNoConnected: false,  });
         } else {
            // ToastAndroid.show('not Connected', ToastAndroid.SHORT);
            this.setState({ isNoConnected: true });
         }
      });

      setTimeout(() => {
         if (this.state.isNoConnected) {
            Alert.alert(
               'Alert..Poor Internet!',
               'Please check your internet connection and try again!',
               [
                  { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                  { text: '', onPress: () => this.setState({ modalVisible: false }) },
               ],
               { cancelable: false }
            )
         }
      }, 5000)
   }

   onStart = () => {
      console.log("onStart");

      this.setState({ isNoConnectedStart: true, displayPoster: false });

      checkInternetConnection().then(isConnected => {
         if (isConnected) {
            // ToastAndroid.show('Connected', ToastAndroid.SHORT);
            this.setState({ isNoConnectedStart: false });
         } else {
            // ToastAndroid.show('not Connected', ToastAndroid.SHORT);
            this.setState({ isNoConnectedStart: true });
         }
      });

      setTimeout(() => {
         if (this.state.isNoConnectedStart) {
            Alert.alert(
               'Alert..Poor Internet!',
               'Please check your internet connection and try again!',
               [
                  { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                  { text: '', onPress: () => this.setState({ modalVisible: false }) },
               ],
               { cancelable: false }
            )
         }
      }, 5000)
   }

   onProgress = (data) => {
      //ToastAndroid.show('onProgress=>'+data.currentTime, ToastAndroid.SHORT)
      if (data > 7 && ran == 0) {
         ran = 1;
         if (this.props.user) {
            if (this.state.info) {
               if (this.props.user.user.LessonStatus[this.state.info.levelId]) {
                  if (this.state.info.videoType == "Lesson_video") {
                     if (this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.1) {
                        console.log(this.state.info)
                        console.log("user subscribed to this course, lesson video started");
                        // lesson status to 0.3 Lesson in progress
                        let params = {}
                        let object = this.props.user.user.LessonStatus[this.state.info.levelId];
                        console.log('info lession id===============', this.state.info.lessonId)
                        console.log('object lession id===============', object.currentLessonId)
                        if(this.state.info.lessonId == object.currentLessonId){
                           params[this.state.info.levelId] = { ...object, currentStatusLevel: 0.3, currentStatus: "Lesson in progress." }
                           this.props.dispatch({ type: "USER_LESSONSTATUS_UPDATE", params });
                        }
                     }
                  } else {
                     if (this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.7) {
                        console.log("user subscribed to this course, practice video started");
                        // lesson status to 0.85 practice in progress
                        let params = {}
                        let object = this.props.user.user.LessonStatus[this.state.info.levelId];
                        console.log('info lession id===============', this.state.info.lessonId)
                        console.log('object lession id===============', object.currentLessonId)
                        if(this.state.info.lessonId == object.currentLessonId){
                           params[this.state.info.levelId] = { ...object, currentStatusLevel: 0.85, currentStatus: "Practice in progress" }
                           this.props.dispatch({ type: "USER_LESSONSTATUS_UPDATE", params });
                        }
                     }
                  }
               }
            }
         }
      }
   }

   onEnd = () => {
      clear.clearAppCache(() => { })
      console.log("on end");
      // ToastAndroid.show('on end', ToastAndroid.SHORT)
      // set db 
      if (this.props.user) {
         if (this.state.info) {
            if (this.props.user.user.LessonStatus[this.state.info.levelId]) {

               let myRe2 = new RegExp('[1-9][0-9]?$', 'g');
               let lastSeenLessonId = myRe2.exec(this.state.info.lessonId);
               let lastSeenLessonVideoIndex = Number(lastSeenLessonId[0]);

               let myRe1 = new RegExp('[1-9][0-9]?$', 'g');
               let WillSeeLessonId = myRe1.exec(this.props.user.user.LessonStatus[this.state.info.levelId].currentLessonId)
               let WillSeeLessonIndexId = Number(WillSeeLessonId[0]);


               if (this.state.info.videoType == "Lesson_video") {

                  if (this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.3) {
                     console.log("user subscribed to this course, lesson video end");
                     // lesson status to 0.7 start practice
                     let params = {}
                     let object = this.props.user.user.LessonStatus[this.state.info.levelId];

                     if(this.state.info.lessonId == object.currentLessonId){
                        params[this.state.info.levelId] = { ...object, currentStatusLevel: 0.7, currentStatus: "Lesson completed. Practice ready to start." }
                        this.props.dispatch({ type: "USER_LESSONSTATUS_UPDATE", params });
                     }
                  }
               } else {
                  console.log("user subscribed to this course, practice video end");
                  let object = {}
                  var self = this
                  let myRe = new RegExp('[1-9][0-9]?$', 'g');
                  let myArray = myRe.exec(this.state.info.lessonId);
                  let newNum = Number(myArray[0]) + 1;
                  let lessonId = this.state.info.levelId + '-' + newNum;
                  object = this.props.user.user.LessonStatus[this.state.info.levelId];
                  firebase.database().ref().child('levels').child(this.state.info.levelId).once('value')
                     .then(function (snapshot) {
                        if (snapshot.val()) {
                           let weekViewObject = snapshot.val() || {};
                           console.log(weekViewObject);
                           let resetAction = NavigationActions.reset({
                              index: 1,
                              actions: [
                                 NavigationActions.navigate({ routeName: 'HomeScreen' }),
                                 NavigationActions.navigate({ routeName: 'WeekViewScreen', params: { ...weekViewObject } })
                              ],
                           });
                           self.setState({ resetAction });
                        }
                     }).catch((error) => {
                        console.log(error);
                     });


                  firebase.database().ref().child('lessons').child(lessonId).once('value')
                     .then(function (snapshot) {
                        if (snapshot.val()) {

                           if (WillSeeLessonIndexId <= lastSeenLessonVideoIndex) { //new practice video play
                              let info = snapshot.val() || {};
                              console.log(snapshot.val());
                              let params = {};
                              object["currentLessonId"] = info.lessonId;
                              object["currentLessonName"] = info.lessonName;
                              object["currentLessonPHI"] = info.lessonVideoPhI;
                              object["currentLessonWeekID"] = info.lessonWeekId;
                              object["currentLessonWeekId"] = info.lessonWeekId;
                              object["currentStatusLevel"] = 0.1;
                              object["currentStatus"] = "Lesson ready to start.";
                              params[self.state.info.levelId] = { ...object };
                              self.props.dispatch({ type: "USER_LESSONSTATUS_UPDATE", params });
                           }

                        } else {
                           let params = {};
                           console.log("user subscribed to this course, end of course");
                           object["currentStatusLevel"] = 1;
                           object["currentStatus"] = "Course Complete";
                           params[self.state.info.levelId] = { ...object };
                           self.props.dispatch({ type: "USER_LESSONSTATUS_UPDATE", params });
                        }
                     })
                     .catch((error) => {
                        console.log(error);
                        self.props.dispatch({ type: "CLOSE_VIDEO" });
                     });
               }
            }
         }
      }
      // firebase.analytics().logEvent(`Video_Completed`);
      firebase.analytics().logEvent(`Video`, {Video:"Video_Completed"});
   }

   onLoad = (data) => {
      this.setState({ loaded: true })
      //ToastAndroid.show('onLoad', ToastAndroid.SHORT)  
   }

   funloaddata() {
      // global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
      //   .then(res => res.json())
      //   .then(res => {
      //     videourl = res.request.files.progressive[2].url
      //   });

      global.fetch(`https://player.vimeo.com/video/${this.state.videoId}/config`)
         .then(res => res.json())
         .then(res => {
            console.log("---------------------->", res);
            videourl = res.request.files.progressive[2].url
            //  this.setState({
            //    thumbnailUrl: res.video.thumbs['640'],
            //    videoUrl: res.request.files.progressive[2].url,
            //    video: res.video,

            //  })
         });

      //   Alert.alert("call")


   }

   onFullScreen(status) {
      // Set the params to pass in fullscreen status to navigationOptions
      // this.props.navigation.setParams({
      //   fullscreen: !status
      // })
      if (status == false) {
         this.setState({ fullscreenstatus: true })
      }
      else {
         this.setState({ fullscreenstatus: false })
      }
      console.log("full screen ", status)
   }


   onPlayPress(playing) {
      console.log("-----", playing)
   }

   render() {
      // console.log("video:", this.state);
      //  this.funloaddata()

      return (
         <View >


            {this.state.modalVisible ?

               <View style={styles.container}>
                  {/* {this.state.fullscreenstatus ?  <TouchableOpacity style={{ padding: 5 }} onPress={this.onLearnMore}>
                  <Icon name="close" size={24} color="white" />
                </TouchableOpacity> : null} */}

                  {/* {this.funloaddata()} */}
                  {/* <Video url={videourl} 
        rotateToFullScreen = {true}
        onFullScreen={status => this.onFullScreen(status)}
        onPlayPress = {playing => this.onPlayPress(playing)}
        /> */}


                  <Voxplayer videoId={this.state.videoId}
                     onEnd={this.onEnd}
                     onProgress={this.onProgress}
                     onPlayPress={this.onPlayPress}
                     getVideoInfo={this.getVideoInfo}
                     onLoad={this.onLoad}
                     onStart={this.onStart}
                     paused={this.state.paused}
                     loaded={this.state.loaded}
                     displayPoster={this.state.displayPoster}
                     onFullScreen={status => this.onFullScreen(status)}
                  />


               </View>

               : null}

         </View>
      )
   }
}

export const VideoModal = connect(mapStateToProps)(VideoModalNavigation);


export const videoReducer = (state, action) => {
   switch (action.type) {
      case 'OPEN_VIDEO':

         return { ...state, modalVisible: true, play: action.params }
         break;
      case 'CLOSE_VIDEO':
         return { ...state, modalVisible: false, play: null }
         break;
      case 'USER_LESSONSTATUS_UPDATE':
         return { ...state }
         break;
      case 'USER_UPDATE':
         return { ...state }
         break;
      case 'USER_PRACTICE_END':
         return { ...state, modalVisible: false, play: null }
         break;
      case 'CHANGE_VIDEO':
         return { ...state, play: action.params }
         break;
      case 'CLOSE_VIDEO_NEW':
         return { ...state, modalVisible: false }
         break;
      default:
         return { ...state, modalVisible: false, play: null };
   }
}

const styles = StyleSheet.create({
   container: {
      //   flex: 1,
      height: '100%',
      backgroundColor: '#000',
      justifyContent: 'center',
   }
})