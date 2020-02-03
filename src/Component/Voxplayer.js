import React, {useState, useEffect, Component} from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {FullscreenClose, FullscreenOpen} from './assets/icons';
import {PlayerControls} from './player/PlayerControls';
import {ProgressBar} from './player/ProgressBar';
var videourl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

 class VoxPlayer extends Component {
   constructor(props){
     super(props);
     this.state = {
      fullscreen: false,
      play: false,
      currentTime: 0,
      duration: 0,
      showControls: true,
      video: { width: 704, height: 396, duration: 23 },
      thumbnailUrl: null,
      videoUrl: videourl,
      showThumbnail: true,
      modalVisible: false,
      loading:false,
      loaderWidth: Dimensions.get('screen').width,
      loaderHeight: Dimensions.get('screen').height,
      orientation:'PORTRAIT'
    }
    this.videoRef = React.createRef();
    Orientation.getDeviceOrientation(orientation=>{
      if(orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'){
        this.setState({
          orientation:orientation,
          loaderWidth: Dimensions.get('screen').height,
          loaderHeight: Dimensions.get('screen').width,
        })
      } else{
        this.setState({
          orientation:orientation,
          loaderWidth: Dimensions.get('screen').width,
          loaderHeight: Dimensions.get('window').width * (9 / 16),
        })
      }
    });
   }
   componentDidMount(){
    Orientation.addOrientationListener(this.handleOrientation);
    // ${this.props.videoId}
    this.setState({
      loading:true
    });
    setTimeout(() => {this.setState({showControls: false})}, 3000);
    global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
      .then(res => res.json())
      .then(res => {
        console.log("---------------------->", res);
        videourl = res.request.files.hls.cdns[res.request.files.hls.default_cdn].url
        this.setState({
          thumbnailUrl: res.video.thumbs['640'],
          videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          video: res.video,
          play: true,
          showControls: true
        })
        setTimeout(() => {this.setState({showControls: false})}, 3000);

      }).catch(err=>{
        this.setState({
          loading:false
        })
        Alert.alert("Sorry!","There is an issue.Please try after some time.");
      });
   }

   componentWillUnmount(){
     this.setState({
      play: false
     })
    Orientation.removeOrientationListener(this.handleOrientation);
   }
  


  handleOrientation=(orientation) => {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (this.setState({fullscreen: true,orientation:orientation,}), StatusBar.setHidden(true))
      : (this.setState({fullscreen: false,orientation:orientation,}),
        StatusBar.setHidden(false));
  }

  handleFullscree=()=> {
    if(this.state.fullscreen){
      Orientation.unlockAllOrientations();
       this.setState({
        loaderWidth: Dimensions.get('window').width,
        loaderHeight: Dimensions.get('window').height,
      })
    }else{
      Orientation.lockToLandscapeLeft();
      this.setState({
        loaderWidth: Dimensions.get('window').height,
        loaderHeight: Dimensions.get('window').width,
      })
    }
  }

  handlePlayPause=()=> {
    // If playing, pause and show controls immediately.
    if (this.state.play) {
      this.setState({...this.state, play: false, showControls: true});
      return;
    }

    this.setState({...this.state, play: true});
   // setTimeout(() => this.setState({showControls: false}), 3000);
  }

  skipBackward=()=> {
    this.videoRef.current.seek(this.state.currentTime - 15);
    this.setState({...this.state, currentTime: this.state.currentTime - 15});
  }

  skipForward=() =>{
    this.videoRef.current.seek(this.state.currentTime + 15);
    this.setState({...this.state, currentTime: this.state.currentTime + 15});
  }

  onSeek=(data)=> {
    this.videoRef.current.seek(data.seekTime);
   this. setState({...this.state, currentTime: data.seekTime});
  }
  handleFullscreen=()=> {
    this.state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

 onLoadEnd=(data) =>{
  //Alert.alert("test load finish");
    this.setState({
      duration: data.duration,
      currentTime: data.currentTime,
      loading:false
    });
  }

   onProgress=(data)=> {
    this.setState({
      currentTime: data.currentTime,
    });
  }

  onEnd=()=> {
    this.setState({...this.state, play: false});
    this.videoRef.current.seek(0);
  }

  showControls=()=> {
   /* if(this.state.showControls){
    this.setState({...this.state, showControls: false})
   } else { */
    this.setState({...this.state, showControls: true});
      setTimeout(() => {this.setState({showControls: false})}, 5000);
   /* } */
  }

  onBuffer = (data)=>{
    console.log("DATA==>",data);
    if(data.isBuffering){
      this.setState({loading:true,showControls: true})
    } else{
      this.setState({loading:false})
      setTimeout(() => {this.setState({showControls: false})}, 3000);
    }
  }

  onLearnMore = () => {
    // this.props.dispatch(this.closeModal());
    this.setState({
      play:false
    });
    this.props.dispatch({ type: 'CLOSE_VIDEO_NEW' })
    // this.props.closemodal

    // this.setState({modalVisible : false})
    
 }

 _renderVideoPlayer=()=>{
   return(
    <TouchableWithoutFeedback onPress={this.showControls}>
    <View style={{width:'100%',height:Dimensions.get('window').width<Dimensions.get('window').height?'40%':'100%'}}>
      <Video
        ref={this.videoRef}
        source={{
          uri:
          this.state.videoUrl,
        }}
        style={{height:'100%',width:'100%'}}
        controls={true}
        resizeMode={'contain'}
        onLoad={this.onLoadEnd}
        onProgress={this.onProgress}
        onEnd={this.onEnd}
        onBuffer={this.onBuffer}
        paused={!this.state.play}
        fullscreen={true}
        fullscreenOrientation="landscape"
        onError={(err)=>{Alert.alert("Sorry!",error['errorString']);}}
        bufferConfig={{
          minBufferMs: 1000, 
          maxBufferMs: 5000,
          bufferForPlaybackMs: 700,
          bufferForPlaybackAfterRebufferMs: 500
        }}
      />
      
      {/* {this.state.showControls && (
         <View style={styles.controlOverlay}>
          <TouchableOpacity
            onPress={this.handleFullscreen}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.fullscreenButton}>
              <Image source= {this.state.fullscreen? require('../Component/assets/icons/fullscreen-close.png') :  require('../Component/assets/icons/fullscreen-open.png') } />
            
          </TouchableOpacity>
          <PlayerControls
            onPlay={this.handlePlayPause}
            onPause={this.handlePlayPause}
            playing={this.state.play}
            showPreviousAndNext={false}
            showSkip={false}
            skipBackwards={this.skipBackward}
            skipForwards={this.skipForward}
          /> 
          <ProgressBar
            currentTime={this.state.currentTime}
            duration={this.state.duration > 0 ? this.state.duration : 0}
            onSlideStart={this.handlePlayPause}
            onSlideComplete={this.handlePlayPause}
            onSlideCapture={this.onSeek}
          />
        </View> 
      )} */}
       {!this.state.fullscreen ?  <TouchableOpacity style={{ padding: 5,position:'absolute',top:0,left:0 }} onPress={this.onLearnMore}>
                  <Icon name="close" size={24} color="white" />
                </TouchableOpacity> : null} 
                <TouchableOpacity
            onPress={this.handleFullscreen}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={[styles.fullscreenButton,{padding: 5,position:'absolute',top:0,right:0}]}>
              <Image source= {this.state.fullscreen? require('../Component/assets/icons/fullscreen-close.png') :  require('../Component/assets/icons/fullscreen-open.png') } />
            
          </TouchableOpacity>
      
    </View>
  </TouchableWithoutFeedback>
   )
 }

  render(){
  return (
    <View style={styles.container}>
      
     
      {
            this._renderVideoPlayer()
      }
      {
            this.state.loading && 
            <View style={{top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center',position:'absolute',backgroundColor:'rgba(0,0,0,0.6)'}}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
            
          }
         
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#000',
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
const mapDispatchToProps = dispatch => ({

  closemodal: (params) => {
    dispatch({ type: 'CLOSE_VIDEO', })
 },

})
export default connect(mapDispatchToProps)(VoxPlayer);