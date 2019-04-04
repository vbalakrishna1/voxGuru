'use strict'

// React
import React from 'react'
import { Modal, View, Text, Button , Alert, ActivityIndicator,
     TouchableOpacity,ToastAndroid,NetInfo} from  'react-native'
//Redux
import { connect } from 'react-redux';
import Voxplayer from '../Component/Voxplayer';
import KeepAwake from 'react-native-keep-awake';
import firebase from 'react-native-firebase';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyledFloatIcon } from '../UI';
import { NavigationActions } from 'react-navigation';
import clear from 'react-native-clear-app-cache'

import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';




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
            videoId: (() => {
                let val = props.video.play
                console.log(videoId);
                console.log(val);
              if(val){
                  if(typeof val !== "object") return val;
                } else{
                    if(val) return val.videoId;
                }
            })(),
            info: null,
            loaded: false,
            resetAction: null,
            isNoConnected:true,     
            isNoConnectedStart:true,      
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

        getVideoInfo =(videoId) => {
            const self = this;
            firebase.database().ref().child('video').child(videoId).once('value')
                .then(function(snapshot){
                if(snapshot.val()){
                    let info = snapshot.val() || {};
                    // console.log(snapshot.val());
                    self.setState({info});
                } else {
                    self.setState({info:null});
                }
                })
                .catch((error)=>{
                    console.error(error);
                });
        }
      
        componentWillReceiveProps(nextProps) {
            if(nextProps.video !== this.props.video) {
                if (nextProps.video.modalVisible) {
                    this.setState({modalVisible: true, loaded:false});
                } else {
                    this.setState({modalVisible: false});
                }
                if(nextProps.video.play){
                    if(typeof nextProps.video.play !== "object"){
                        this.setState({videoId:nextProps.video.play});
                        this.getVideoInfo(nextProps.video.play);
                    } else{
                        if(nextProps.video.play.videoId) this.setState({videoId:nextProps.video.play.videoId});
                        this.getVideoInfo(nextProps.video.play.videoId);
                    }
                    
                } else{
                    this.setState({videoId:null});
                }

            }
        }
        componentWillUpdate(){
            ran = 0;
        }

        componentWillMount() {
            NetInfo.addEventListener(
                'connectionChange',
                this.handleFirstConnectivityChange
              );
        }

        componentDidMount(){
            // loads at app launch
        }

    closeModal = () => {
        if(this.state.resetAction){
            return this.state.resetAction;
        } else {
            return{ type:'CLOSE_VIDEO', payload: null }
        }
    }
    
    onLearnMore = () =>{
        this.props.dispatch(this.closeModal());
    }

    onPlayPress = () =>{
        console.log("On Play press");
        this.setState(prevState=>{loaded:!prevState.loaded});
        this.setState({isNoConnected:true});

         checkInternetConnection().then(isConnected => {
            if(isConnected){
                // ToastAndroid.show('Connected', ToastAndroid.SHORT);
                this.setState({isNoConnected:false});
            }else{
               // ToastAndroid.show('not Connected', ToastAndroid.SHORT);
                this.setState({isNoConnected:true});
                }
          }); 

        setTimeout(() => {
          if(this.state.isNoConnected){
            Alert.alert(
                'Alert..Poor Internet!',
                'Please check your internet connection and try again!',
                [
                  {text: 'OK', onPress: () => this.setState({modalVisible: false})},
                  {text: ''  , onPress: () => this.setState({modalVisible: false})},
                ],
                { cancelable: false }
              )
          }
        }, 5000) 
   }

  onStart = () =>{
    console.log("onStart");
  
    this.setState({isNoConnectedStart:true});

     checkInternetConnection().then(isConnected => {
        if(isConnected){
            // ToastAndroid.show('Connected', ToastAndroid.SHORT);
            this.setState({isNoConnectedStart:false});
        }else{
           // ToastAndroid.show('not Connected', ToastAndroid.SHORT);
            this.setState({isNoConnectedStart:true});
            }
      }); 

    setTimeout(() => {
      if(this.state.isNoConnectedStart){
        Alert.alert(
            'Alert..Poor Internet!',
            'Please check your internet connection and try again!',
            [
              {text: 'OK', onPress: () => this.setState({modalVisible: false})},
              {text: ''  , onPress: () => this.setState({modalVisible: false})},
            ],
            { cancelable: false }
          )
      }
    }, 5000) 
}
  
    onProgress =(data)=>{
        //ToastAndroid.show('onProgress=>'+data.currentTime, ToastAndroid.SHORT)
            if(data.currentTime > 7 && ran == 0 ){
                ran = 1;
                if(this.props.user){
                    if(this.state.info){
                        if(this.props.user.user.LessonStatus[this.state.info.levelId]){

                            if(this.state.info.videoType == "Lesson_video"){

                                if(this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.1){
                                    console.log("user subscribed to this course, lesson video started") ;
                                    // lesson status to 0.3 Lesson in progress
                                    let params = {}
                                    let object = this.props.user.user.LessonStatus[this.state.info.levelId];
                                    params[this.state.info.levelId] = {...object ,currentStatusLevel: 0.3, currentStatus: "Lesson in progress."}
                                    this.props.dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
                                }
                            } else{
                                if(this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.7){
                                    console.log("user subscribed to this course, practice video started") ;
                                    // lesson status to 0.85 practice in progress
                                    let params = {}
                                    let object = this.props.user.user.LessonStatus[this.state.info.levelId];
                                    params[this.state.info.levelId] = {...object ,currentStatusLevel: 0.85, currentStatus: "Practice in progress"}
                                    this.props.dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
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
        if(this.props.user){
            if(this.state.info){
                if(this.props.user.user.LessonStatus[this.state.info.levelId]){

                    let myRe2 = new RegExp('[1-9][0-9]?$', 'g');
                    let lastSeenLessonId = myRe2.exec(this.state.info.lessonId);
                    let lastSeenLessonVideoIndex = Number(lastSeenLessonId[0]);
                   
                    let myRe1 = new RegExp('[1-9][0-9]?$', 'g');
                    let WillSeeLessonId = myRe1.exec(this.props.user.user.LessonStatus[this.state.info.levelId].currentLessonId)
                    let WillSeeLessonIndexId = Number(WillSeeLessonId[0]);

                    
                    if(this.state.info.videoType == "Lesson_video"){

                        if(this.props.user.user.LessonStatus[this.state.info.levelId].currentStatusLevel <= 0.3){
                            console.log("user subscribed to this course, lesson video end") ;
                            // lesson status to 0.7 start practice
                            let params = {}
                            let object = this.props.user.user.LessonStatus[this.state.info.levelId];
                            params[this.state.info.levelId] = {...object ,currentStatusLevel: 0.7, currentStatus: "Lesson completed. Practice ready to start."}
                            this.props.dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
                        }

                    } else{
                        console.log("user subscribed to this course, practice video end") ;
                        // need to update to new lesson info and set lesson status to 0.1
                     
                        let object = {}
                        var self = this
                        let myRe = new RegExp('[1-9][0-9]?$', 'g');
                        let myArray = myRe.exec(this.state.info.lessonId);
                        let newNum = Number(myArray[0])+1;
                        let lessonId =  this.state.info.levelId+'-'+newNum;
                        object = this.props.user.user.LessonStatus[this.state.info.levelId];
                        firebase.database().ref().child('levels').child(this.state.info.levelId).once('value')
                        .then(function(snapshot){
                        if(snapshot.val()){
                            let weekViewObject = snapshot.val() || {};
                            console.log(weekViewObject);
                            let resetAction = NavigationActions.reset({
                                index: 1,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'HomeScreen' }),
                                    NavigationActions.navigate({routeName:'WeekViewScreen', params:{...weekViewObject}})
                                ],
                              });
                              self.setState({resetAction}); 
                           }
                        }).catch((error) =>{
                        console.log(error);
                        });


                        firebase.database().ref().child('lessons').child(lessonId).once('value')
                        .then(function(snapshot){
                        if(snapshot.val()){

                          if(WillSeeLessonIndexId <= lastSeenLessonVideoIndex){ //new practice video play
                            let info = snapshot.val() || {};
                            console.log(snapshot.val());
                            let params = {};
                            object["currentLessonId"]= info.lessonId;
                            object["currentLessonName"]= info.lessonName;
                            object["currentLessonPHI"]= info.lessonVideoPhI;
                            object["currentLessonWeekID"]= info.lessonWeekId;
                            object["currentLessonWeekId"]= info.lessonWeekId;
                            object["currentStatusLevel"] = 0.1;
                            object["currentStatus"]= "Lesson ready to start.";
                            params[self.state.info.levelId] = {...object};
                            self.props.dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
                            }
                                                     
                        } else{
                            let params = {};
                            console.log("user subscribed to this course, end of course") ;
                            object["currentStatusLevel"] = 1;
                            object["currentStatus"]= "Course Complete";
                            params[self.state.info.levelId] = {...object};
                            self.props.dispatch({type:"USER_LESSONSTATUS_UPDATE", params});
                        }
                        })
                        .catch((error)=>{
                            console.log(error);
                            self.props.dispatch({type:"CLOSE_VIDEO"});
                        });
                    }
                } 
            } 
        }
    }

    onLoad =(data) =>{
        this.setState({loaded:true})    
        //ToastAndroid.show('onLoad', ToastAndroid.SHORT)  
    }
  
    render(){
    // console.log("video:", this.state);
    return (
      <Modal
      visible={this.state.modalVisible}
      animationType={'slide'}
      onRequestClose={() => this.onLearnMore()}>
        <View style={{flex:1, justifyContent:'center', backgroundColor:'black'}}>


        <TouchableOpacity style={{ padding:5 }} onPress={this.onLearnMore}>
        <Icon name = "close" size={24} color ="white"/>                
        </TouchableOpacity>
 
          <Voxplayer videoId={this.state.videoId}
                    onEnd={this.onEnd}
                    onProgress={this.onProgress}
                    onPlayPress={this.onPlayPress}
                    getVideoInfo={this.getVideoInfo}
                    onLoad={this.onLoad}
                    onStart={this.onStart}
                    />
       {/*  {this.state.loading && <ActivityIndicator style={{ position: 'absolute',
             alignItems: 'center',
             left: 0,
             right: 0,
             top: 0,
             bottom: 0,
             justifyContent: 'center'
             }}
             size={'large'} color={'purple'}/>} */}
           {/*  <ActivityIndicator animating={!this.state.loaded} size={'large'} color={'purple'}/> */}
        <KeepAwake />
        </View>
      </Modal>
    )
  }
}
export const VideoModal = connect(mapStateToProps)(VideoModalNavigation);


export const videoReducer = (state,action) => {
    switch(action.type) {
        case 'OPEN_VIDEO':
            return { ...state, modalVisible : true, play:action.params}
            break;
        case 'CLOSE_VIDEO':
            return { ...state, modalVisible : false, play:null}
            break;
        case 'USER_LESSONSTATUS_UPDATE':
            return { ...state}
            break;
        case 'USER_UPDATE':
            return { ...state}
            break;
        case 'USER_PRACTICE_END':
            return { ...state, modalVisible : false, play:null}
            break;
        case 'CHANGE_VIDEO':
            return { ...state, play:action.params}
            break;
        default:
            return {...state, modalVisible : false, play:null};
    }
  }
