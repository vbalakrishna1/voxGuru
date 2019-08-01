import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, ToastAndroid, Alert,StyleSheet } from 'react-native';
// import VideoPlayer from 'react-native-video-player';
// import VideoPlayer from 'react-native-video-controls';
// import Video from 'react-native-video'
import { NavigationActions } from 'react-navigation';
// // import {Icon} from 'react-native-material-design';
// // import firebase from '../services';
// // import CountDown from './CountDown';
import Video from 'react-native-af-video-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
// const VIMEO_ID = '235014989';
var videourl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
 class VoxPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { width: 704, height: 396, duration: 23 },
      thumbnailUrl: null,
      videoUrl: null,
      onEnd: false,
      showThumbnail: true,
      paused:true,
      fullscreenstatus : true,
      modalVisible: false,
    };
  };

  componentWillMount() {
    // Remember to add listener
    // fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
    // .then(res => res.json())
    // .then(res => {
    //   console.log("---------------------->", res);
    //   videourl = res.request.files.progressive[2].url
    //   this.setState({
    //     thumbnailUrl: res.video.thumbs['640'],
    //     videoUrl: res.request.files.progressive[2].url,
    //     video: res.video,
    //   })
    // });
    // this.funloaddata()
  };


  componentDidMount() {
    // this.props.getVideoInfo(this.props.videoId);    
    // need to update
    global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
      .then(res => res.json())
      .then(res => {
        console.log("---------------------->", res);
        videourl = res.request.files.progressive[2].url
        this.setState({
          thumbnailUrl: res.video.thumbs['640'],
          videoUrl: res.request.files.progressive[2].url,
          video: res.video,
        })
      });
    // global.fetch(`https://player.vimeo.com/video/233958481/config`)
    // .then(res => res.json())
    // .then(res => {
    //   console.log("---------------------->", res);
    //   videourl = res.request.files.progressive[2].url
    //   this.setState({
    //     thumbnailUrl: res.video.thumbs['640'],
    //     videoUrl: res.request.files.progressive[2].url,
    //     video: res.video,
    //   })
    // });
    
      
  };


  funloaddata()
  {
    // global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
    //   .then(res => res.json())
    //   .then(res => {
    //     videourl = res.request.files.progressive[2].url
    //   });

    global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
    .then(res => res.json())
    .then(res => {
      console.log("---------------------->", res);
      videourl = res.request.files.progressive[2].url
      this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.progressive[2].url,
        video: res.video,
      })
    });



  }


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

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    // this.props.navigation.setParams({
    //   fullscreen: !status
   
    // })

    if(status == false)
      {
         this.setState({fullscreenstatus : true})
      }
      else
      {
         this.setState({fullscreenstatus : false})
      }

 console.log(status)
  }

  onLearnMore = () => {
    // this.props.dispatch(this.closeModal());
    this.props.dispatch({ type: 'CLOSE_VIDEO_NEW' })
    // this.props.closemodal

    // this.setState({modalVisible : false})
    
 }

  render() {

    
    return (
      <View style={{ flexGrow: 1, justifyContent: 'center', backgroundColor: "black" }}>
        {/* <VideoPlayer
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
           /> */}

           <View style={styles.container}>

           {this.state.fullscreenstatus ?  <TouchableOpacity style={{ padding: 5 }} onPress={this.onLearnMore}>
                  <Icon name="close" size={24} color="white" />
                </TouchableOpacity> : null} 
           {/* {this.funloaddata()} */}
        <Video url={videourl} 
        rotateToFullScreen = {true}
        placeholder = {this.state.thumbnailUrl}
        onFullScreen={status => this.onFullScreen(status)}
        onProgress={this.props.onProgress}
          onEnd={this.props.onEnd}
          onLoad={this.props.onLoad}
        />
        {/* <Video url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'} 
        rotateToFullScreen = {true}
        onFullScreen={status => this.onFullScreen(status)}
        /> */}
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})


const mapDispatchToProps = dispatch => ({

  closemodal: (params) => {
    dispatch({ type: 'CLOSE_VIDEO', })
 },

})


export default VoxPlayer = connect(mapDispatchToProps)(VoxPlayer);