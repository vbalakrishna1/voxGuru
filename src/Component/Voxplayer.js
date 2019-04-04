import React, { Component } from 'react';
import { View,ScrollView,TouchableOpacity,Text,ToastAndroid } from 'react-native';
import VideoPlayer from 'react-native-video-player';
// import { NavigationActions } from 'react-navigation';
// // import {Icon} from 'react-native-material-design';
// // import firebase from '../services';
// // import CountDown from './CountDown';

// const VIMEO_ID = '235014989';

export default class VoxPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { width: 704, height: 396, duration: 23 },
      thumbnailUrl: null,
      videoUrl: null,
      onEnd: false,
    };
  };

    componentWillMount() {
    // Remember to add listener
   
  };


  componentDidMount() {
    // this.props.getVideoInfo(this.props.videoId);    
    // need to update
    global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
      .then(res => res.json())
      .then(res => {
        console.log("---------------------->"+res);
        this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.progressive[2].url,
        video: res.video,
      })
      });
  };


  // Todo: Check the fetch response and see if there urls for other types like progressive, instead of hls
  
  componentWillUnmount() {
    // Remember to remove listener
   
  };

  onProgress = (data) => {
     console.log('onProgress', data );
    
  };

  onEnd = (data) => { 
    console.log( 'onEnd' ,data);
  
  };

  onLoad = (data) => { 
    console.log( 'onLoad' ,data);
  };

  onStart = (data) => { 
    console.log( 'onStart' ,data);
  };


  onPlayPress =(data) => {
    console.log('onPlayPress', data)
  };
  
  render() {
    return (
      <View style={{flexGrow: 1,justifyContent:'center', backgroundColor:"black" }}>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.state.thumbnailUrl }}
          video={{uri: this.state.videoUrl , type: 'mp4'}}
          videoWidth={this.state.video.width}
          videoHeight={this.state.video.height}
          duration={this.state.video.duration}
          onProgress={this.props.onProgress}
          onEnd={this.props.onEnd}
          onPlayPress={this.props.onPlayPress}
          onLoad={this.props.onLoad}
          repeat={this.props.repeat}
          onStart={this.props.onStart}
           />
      </View>
    );
  }
}