import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, ToastAndroid, Alert } from 'react-native';
import VideoPlayer from 'react-native-video-player';
// import VideoPlayer from 'react-native-video-controls';
// import Video from 'react-native-video'
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
      showThumbnail: true,
      paused:true
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
        console.log("---------------------->", res);
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
    //  console.log('onProgress', data );
    Alert.alert("onProgress")

  };

  onEnd = (data) => {
    console.log('onEnd', data);
    Alert.alert("onstart")

  };

  onLoad = (data) => {
    // console.log( 'onLoad' ,data);
    Alert.alert("onLoad")
  };

  onStart = (data) => {
    // console.log( 'onStart' ,data);
    Alert.alert("onstart")
  };


  onPlayPress = (data) => {
    // console.log('onPlayPress', data)
    Alert.alert("onPlayPress")
  };

  render() {
    return (
      <View style={{ flexGrow: 1, justifyContent: 'center', backgroundColor: "black" }}>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.state.thumbnailUrl}}
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
        {/* <VideoPlayer
          source={{ uri: this.state.videoUrl }}
          poster={this.state.showThumbnail ? this.state.thumbnailUrl : undefined}
          onLoad={() => this.setState({ showThumbnail: false})}
          onPlayPress={() => this.setState({ showThumbnail: false})}
          disableBack = {true}
          paused={this.state.paused}
        ></VideoPlayer> */}
        {/* <VideoPlayer
          endWithThumbnail
          source={{ uri: this.state.videoUrl }}
          poster={this.state.thumbnailUrl}
          disableBack={true}
          onProgress={this.props.onProgress}
          onEnd={this.props.onEnd}
          onPlayPress={this.props.onPlayPress}
          onLoad={this.props.onLoad}
          repeat={this.props.repeat}
          onStart={this.props.onStart}
        /> */}
        {/* <VideoPlayer
          poster={this.state.showThumbnail ? this.state.thumbnailUrl : undefined}
          source={{ uri: this.state.videoUrl }}
          disableBack={true}
          disableFullscreen={true}
          paused={this.state.paused}
          onPlay={() => this.setState({showThumbnail:false,paused:false})}
        /> */}
      </View>
    );
  }
}