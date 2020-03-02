// import React, {useState, useEffect, Component} from 'react';
// import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   ActivityIndicator,
//   Text,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Alert,
//   WebView
// } from 'react-native';

// import Video, {
//   OnSeekData,
//   OnLoadData,
//   OnProgressData,
// } from 'react-native-video';
// import Orientation from 'react-native-orientation-locker';
// import {FullscreenClose, FullscreenOpen} from './assets/icons';
// import {PlayerControls} from './player/PlayerControls';
// import {ProgressBar} from './player/ProgressBar';
// var videourl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';


// function getVimeoPageURL(videoId) {
//   console.log('https://player.vimeo.com/video/' + videoId)
//   return 'https://player.vimeo.com/video/' + videoId;
// }


//  class VoxPlayer extends Component {
//    constructor(props){
//      super(props);
//      this.state = {
//       fullscreen: false,
//       play: false,
//       currentTime: 0,
//       duration: 0,
//       showControls: true,
//       video: { width: 704, height: 396, duration: 23 },
//       thumbnailUrl: null,
//       videoUrl: videourl,
//       showThumbnail: true,
//       modalVisible: false,
//       loading:false,
//       loaderWidth: Dimensions.get('screen').width,
//       loaderHeight: Dimensions.get('screen').height,
//       orientation:'PORTRAIT',
//       visible: true
//     }
//     this.videoRef = React.createRef();
//     Orientation.getDeviceOrientation(orientation=>{
//       if(orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'){
//         this.setState({
//           orientation:orientation,
//           loaderWidth: Dimensions.get('screen').height,
//           loaderHeight: Dimensions.get('screen').width,
//         })
//       } else{
//         this.setState({
//           orientation:orientation,
//           loaderWidth: Dimensions.get('screen').width,
//           loaderHeight: Dimensions.get('window').width * (9 / 16),
//         })
//       }
//     });
//    }
//    componentDidMount(){
//     Orientation.addOrientationListener(this.handleOrientation);
//     // ${this.props.videoId}
//     this.setState({
//       loading:true
//     });
//     setTimeout(() => {this.setState({showControls: false})}, 3000);
//     global.fetch(`https://player.vimeo.com/video/${this.props.videoId}/config`)
//       .then(res => res.json())
//       .then(res => {
//         console.log("---------------------->", res);


//         // for (let i = 0; i < res.request.files.progressive.length; i++) {
//         //   if (res.request.files.progressive[i].quality == '360p') {
//         //     this.setState({ videoUrl: res.request.files.progressive[i].url, })
//         //     videourl = res.request.files.progressive[i].url
//         //   }
//         // }


//         videourl = res.request.files.hls.cdns[res.request.files.hls.default_cdn].url
//         this.setState({
//           thumbnailUrl: res.video.thumbs['640'],
//           videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
//           video: res.video,
//           play: true,
//           showControls: true
//         })
//         setTimeout(() => {this.setState({showControls: false})}, 3000);

//       }).catch(err=>{
//         this.setState({
//           loading:false
//         })
//         Alert.alert("Sorry!","There is an issue.Please try after some time.");
//       });
//    }

//    componentWillUnmount(){
//      this.setState({
//       play: false
//      })
//     Orientation.removeOrientationListener(this.handleOrientation);
//    }



//   handleOrientation=(orientation) => {
//     orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
//       ? (this.setState({fullscreen: true,orientation:orientation,}), StatusBar.setHidden(true))
//       : (this.setState({fullscreen: false,orientation:orientation,}),
//         StatusBar.setHidden(false));
//   }

//   handleFullscree=()=> {
//     if(this.state.fullscreen){
//       Orientation.unlockAllOrientations();
//        this.setState({
//         loaderWidth: Dimensions.get('window').width,
//         loaderHeight: Dimensions.get('window').height,
//       })
//     }else{
//       Orientation.lockToLandscapeLeft();
//       this.setState({
//         loaderWidth: Dimensions.get('window').height,
//         loaderHeight: Dimensions.get('window').width,
//       })
//     }
//   }

//   handlePlayPause=()=> {
//     // If playing, pause and show controls immediately.
//     if (this.state.play) {
//       this.setState({...this.state, play: false, showControls: true});
//       return;
//     }

//     this.setState({...this.state, play: true});
//    // setTimeout(() => this.setState({showControls: false}), 3000);
//   }

//   skipBackward=()=> {
//     this.videoRef.current.seek(this.state.currentTime - 15);
//     this.setState({...this.state, currentTime: this.state.currentTime - 15});
//   }

//   skipForward=() =>{
//     this.videoRef.current.seek(this.state.currentTime + 15);
//     this.setState({...this.state, currentTime: this.state.currentTime + 15});
//   }

//   onSeek=(data)=> {
//     this.videoRef.current.seek(data.seekTime);
//    this. setState({...this.state, currentTime: data.seekTime});
//   }
//   handleFullscreen=()=> {
//     this.state.fullscreen
//       ? Orientation.unlockAllOrientations()
//       : Orientation.lockToLandscapeLeft();
//   }

//  onLoadEnd=(data) =>{
//   //Alert.alert("test load finish");
//     this.setState({
//       duration: data.duration,
//       currentTime: data.currentTime,
//       loading:false
//     });
//   }

//    onProgress=(data)=> {
//     this.setState({
//       currentTime: data.currentTime,
//     });
//   }

//   onEnd=()=> {
//     this.setState({...this.state, play: false});
//     this.videoRef.current.seek(0);
//   }

//   showControls=()=> {
//    /* if(this.state.showControls){
//     this.setState({...this.state, showControls: false})
//    } else { */
//     this.setState({...this.state, showControls: true});
//       setTimeout(() => {this.setState({showControls: false})}, 5000);
//    /* } */
//   }

//   onBuffer = (data)=>{
//     console.log("DATA==>",data);
//     if(data.isBuffering){
//       this.setState({loading:true,showControls: true})
//     } else{
//       this.setState({loading:false})
//       setTimeout(() => {this.setState({showControls: false})}, 3000);
//     }
//   }

//   onLearnMore = () => {
//     // this.props.dispatch(this.closeModal());
//     this.setState({
//       play:false
//     });
//     this.props.dispatch({ type: 'CLOSE_VIDEO_NEW' })
//     // this.props.closemodal

//     // this.setState({modalVisible : false})

//  }
//  hideSpinner() {
//   this.setState({ visible: false });
// }
//  _renderVideoPlayer=()=>{
//    return(
//     <TouchableWithoutFeedback onPress={this.showControls}>
//     <View style={{width:'100%',height:Dimensions.get('window').width<Dimensions.get('window').height?'40%':'100%'}}>
//       <Video
//         ref={this.videoRef}
//         source={{
//           uri:
//           this.state.videoUrl,
//         }}
//         style={{height:'100%',width:'100%'}}
//         controls={true}
//         resizeMode={'contain'}
//         onLoad={this.onLoadEnd}
//         onProgress={this.onProgress}
//         onEnd={this.onEnd}
//         onBuffer={this.onBuffer}
//         paused={!this.state.play}
//         fullscreen={true}
//         fullscreenOrientation="landscape"
//         onError={(err)=>{Alert.alert("Sorry!",error['errorString']);}}
//         bufferConfig={{
//           minBufferMs: 1000, 
//           maxBufferMs: 5000,
//           bufferForPlaybackMs: 700,
//           bufferForPlaybackAfterRebufferMs: 500
//         }}
//       />

//       {/* {this.state.showControls && (
//          <View style={styles.controlOverlay}>
//           <TouchableOpacity
//             onPress={this.handleFullscreen}
//             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//             style={styles.fullscreenButton}>
//               <Image source= {this.state.fullscreen? require('../Component/assets/icons/fullscreen-close.png') :  require('../Component/assets/icons/fullscreen-open.png') } />

//           </TouchableOpacity>
//           <PlayerControls
//             onPlay={this.handlePlayPause}
//             onPause={this.handlePlayPause}
//             playing={this.state.play}
//             showPreviousAndNext={false}
//             showSkip={false}
//             skipBackwards={this.skipBackward}
//             skipForwards={this.skipForward}
//           /> 
//           <ProgressBar
//             currentTime={this.state.currentTime}
//             duration={this.state.duration > 0 ? this.state.duration : 0}
//             onSlideStart={this.handlePlayPause}
//             onSlideComplete={this.handlePlayPause}
//             onSlideCapture={this.onSeek}
//           />
//         </View> 
//       )} */}
//        {!this.state.fullscreen ?  <TouchableOpacity style={{ padding: 5,position:'absolute',top:0,left:0 }} onPress={this.onLearnMore}>
//                   <Icon name="close" size={24} color="white" />
//                 </TouchableOpacity> : null} 
//                 <TouchableOpacity
//             onPress={this.handleFullscreen}
//             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//             style={[styles.fullscreenButton,{padding: 5,position:'absolute',top:0,right:0}]}>
//               <Image source= {this.state.fullscreen? require('../Component/assets/icons/fullscreen-close.png') :  require('../Component/assets/icons/fullscreen-open.png') } />

//           </TouchableOpacity>

//     </View>
//   </TouchableWithoutFeedback>
//    )
//  }

//   render(){
//   return (
//     <View style={styles.container}>


//       {
//             this._renderVideoPlayer()
//       }
//       {
//             this.state.loading && 
//             <View style={{top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center',position:'absolute',backgroundColor:'rgba(0,0,0,0.6)'}}>
//               <ActivityIndicator size="large" color="#ffffff" />
//             </View>

//           }

//     </View>
//   );
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent:'center',
//     backgroundColor: '#000',
//   },
//   video: {
//     height: Dimensions.get('window').width * (9 / 16),
//     width: Dimensions.get('window').width,
//     backgroundColor: 'black',
//   },
//   fullscreenVideo: {
//     height: Dimensions.get('window').width,
//     width: Dimensions.get('window').height,
//     backgroundColor: 'black',
//   },
//   text: {
//     marginTop: 30,
//     marginHorizontal: 20,
//     fontSize: 15,
//     textAlign: 'justify',
//   },
//   fullscreenButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     paddingRight: 10,
//   },
//   controlOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000000c4',
//     justifyContent: 'space-between',
//   },
// });
// const mapDispatchToProps = dispatch => ({

//   closemodal: (params) => {
//     dispatch({ type: 'CLOSE_VIDEO', })
//  },

// })
// export default connect(mapDispatchToProps)(VoxPlayer);


import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, WebView, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
// import Vimeo from 'react-native-vimeo';
import Orientation from 'react-native-orientation-locker';
import { object } from 'prop-types';
function getVimeoPageURL(videoId) {
  //Fix Quality.
  // console.log('https://player.vimeo.com/video/' + videoId + '?quality=360p')
  // return 'https://player.vimeo.com/video/' + videoId + '?quality=360p';

  //Auto Quality.
  console.log('https://player.vimeo.com/video/' + videoId)
  return 'https://player.vimeo.com/video/' + videoId;
}

class VoxPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { width: 704, height: 396, duration: 23 },
      thumbnailUrl: null,
      videoUrl: null,
      onEnd: false,
      showThumbnail: true,
      paused: true,
      fullscreenstatus: true,
      modalVisible: false,
      visible: true
    };
  };


  componentDidMount() {
    Orientation.lockToLandscape();
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
    this.webview.injectJavaScript('window.testMessage = "hello world"; void(0);');

  };

  onFullScreen(status) {
    if (status == false) {
      this.setState({ fullscreenstatus: true })
    }
    else {
      this.setState({ fullscreenstatus: false })
    }
  }

  onLearnMore = () => {
    Orientation.lockToPortrait()
    this.props.dispatch({ type: 'CLOSE_VIDEO_NEW' })
  }
  hideSpinner() {
    this.setState({ visible: false });
  }
  onMessage = (event) => {
    let obj = JSON.parse(event.nativeEvent.data)
    // console.log(event.nativeEvent.data.eventData)
    switch (obj.event) {
      case 'play':
        break;

      case 'pause':
        break;

      case 'timeupdate':
        this.props.onProgress(obj.data)
        break;

      case 'end':
        this.props.onEnd()
        break;

      default:
        break;
    }

    console.log('----------------11111111222------------', obj)

  }

  onWebViewLoaded = () => {
    let js = `
      const postmeg=(event,data)=>{
        let eventData = {
          event:event,
          data:data
        } 
        window.postMessage(JSON.stringify(eventData))
      }
      var iframe = document.querySelector('iframe');
      var player = new Vimeo.Player(iframe);

      player.on('play', function (data) {
        postmeg('play',data.duration)
      });
      player.on('pause', function (data) {
        postmeg('pause',data.seconds)
      });
      player.on('timeupdate', function (data) {
        postmeg('timeupdate',data.seconds)
      });
      player.on('ended', function(data) {
        postmeg("ended",'end')
      });
    `

    this.webview.injectJavaScript(js);
    console.log('****************injected broken');
  }
  render() {
    return (
      <View style={{ flexGrow: 1, justifyContent: 'center', backgroundColor: "black" }}>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          {this.state.fullscreenstatus ?
            <TouchableOpacity style={{ padding: 5, position: 'absolute', top: 0, right: 0, left: 0, zIndex: 1000, width: 50, height: 40 }} onPress={this.onLearnMore}>
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity> : null}

          {/* <WebView
           ref={ref => (this.webview = ref)}
            style={{ backgroundColor: 'black' }}
            // source={{ uri: getVimeoPageURL(this.props.videoId) }}
            source={{html: '<div style="position:relative; padding-bottom: 56.25%;height: 0;"><iframe src="https://player.vimeo.com/video/132471949?playsinline=false" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" width="100%" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen=true></iframe></div>'}}  
            onLoad={() => this.hideSpinner()}
            originWhitelist={['*']}
            // injectedJavaScript={javaScript}
            onMessage = {this.onMessage}
            javaScriptEnabled={true}
          /> */}

          <WebView
            ref={ref => (this.webview = ref)}
            style={{backgroundColor:'black'}}
            source={{ html: `<script src="https://player.vimeo.com/api/player.js"></script>
            <div style="position:relative; background:black; padding-bottom: 56.25%;">
                <iframe src=${getVimeoPageURL(this.props.videoId)} style="position: absolute; top: 0; left: 0; width: 100%; height: 90%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen=true></iframe>
            </div>` }}

            // source={{ html: `<script src="https://player.vimeo.com/api/player.js"></script><div style="position:relative; padding-bottom: 56.25%;height: 0;"><iframe src=${getVimeoPageURL(this.props.videoId)} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" width="100%" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen=true></iframe></div>` }}
            onError={console.error.bind(console, 'error')}
            // bounces={false}
            onShouldStartLoadWithRequest={() => true}
            javaScriptEnabledAndroid={true}
            startInLoadingState={true}
            onLoad={() => this.hideSpinner()}
            onLoadEnd={this.onWebViewLoaded}
            onMessage={this.onMessage}
            scalesPageToFit={true}
            scrollEnabled={false}
          />

          {/* <Vimeo
          style={{height:300, width:300, backgroundColor:'black'}}
            videoId={this.props.videoId} // Vimeo video ID
            onReady={() => console.log('Video is ready')}
            onPlay={() => console.log('Video is playing')}
            onPlayProgress={data => console.log('Video progress data:', data)}
            onFinish={() => console.log('Video is finished')}
            state={this.state}
          /> */}

          {this.state.visible && (
            <ActivityIndicator
              style={{ position: "absolute", alignSelf: 'center' }}
              size="large"
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  }
})


const mapDispatchToProps = dispatch => ({

  closemodal: () => {
    dispatch({ type: 'CLOSE_VIDEO', })
  },

})


export default VoxPlayer = connect(mapDispatchToProps)(VoxPlayer);