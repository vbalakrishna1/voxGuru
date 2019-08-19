import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Share,
   TouchableHighlight,
   Modal,
   ScrollView,
   BackHandler,
   Alert,
   Dimensions,
   Image,
   ToastAndroid,
   StatusBar,
   Button
} from 'react-native';
import Header from '../Component/Header';
import { StyledText, StyledContainer, StyledBox, StyledFloatIcon, StyledImageContainer, StyledVideoBar, AlignedText } from '../UI';
import TopCard from '../Component/TopCard';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'

import { NavigationActions } from 'react-navigation';

import debounce from 'lodash.debounce'


class LScreen extends React.Component {

   constructor(props) {
      super(props);
      const { width, height } = Dimensions.get('window');

      let courseActive = false;
      // console.log(this.props.navigation.state.params.levelId);
      if (this.props.user.user.LessonStatus) {
         if (this.props.user.user.LessonStatus[this.props.navigation.state.params.levelId]) {
            courseActive = this.props.user.user.LessonStatus[this.props.navigation.state.params.levelId] && this.props.user.user.LessonStatus[this.props.navigation.state.params.levelId].endDate > new Date().getTime()
         }
      }


      this.state = {
         user: props.user || {},
         userLogin: props.user.userLogin,
         params: props.navigation.state.params,
         width, height,
         TopCardAspectRatio: 1.8, courseActive
      }
   }

   componentWillReceiveProps(nextProps) {
      let courseActive = false;

      if (nextProps.user.user.LessonStatus) {
         if (nextProps.user.user.LessonStatus[nextProps.navigation.state.params.levelId]) {
            courseActive = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.levelId]
               && nextProps.user.user.LessonStatus[nextProps.navigation.state.params.levelId].endDate
               > new Date().getTime()
         }
      }
      this.setState({
         user: nextProps.user || {},
         userLogin: nextProps.user.userLogin,
         params: nextProps.navigation.state.params,
         courseActive
      })
   }
   componentDidMount() {
      //console.log(this.props.navigation.state.params)

      Dimensions.addEventListener('change', this._handleChange);
   }

   componentWillUnmount() {
      Dimensions.addEventListener('change', this._handleChange);
   }

   _handleChange = (change) => {
      this.setState({ width: change.window.width, height: change.window.height, TopCardAspectRatio: (change.window.width > change.window.height ? 2 : 1.8) });
   }

   onPractice = () => {
      if (this.state.courseActive) {

         var levelId = this.props.navigation.state.params.levelId;

         var currentStatusLevel = this.props.user.user.LessonStatus[levelId].currentStatusLevel;

         if (this.props.user.user.LessonStatus[levelId].currentStatusLevel < 0.5 &&
            this.props.user.user.LessonStatus[levelId].currentLessonId
            == this.state.params.lessonId) {
            Alert.alert(
               'Not just yet! :-)',
               'Please complete the main lesson before practice!',
               [
                  { text: 'OK', onPress: () => console.log("Error"), style: 'cancel' },
               ],
               { cancelable: true }
            )

         } else {
            // implement practice video open.
            this.props.openVideo(this.props.navigation.state.params.lessonPracticeGuideVideo);
         }
      } else {
         this.props.openPay(this.state.params.levelId);
      }
   }

   onLesson = () => {
      if (this.state.courseActive) {
         this.props.openLesson({ lessonText: this.props.navigation.state.params.lessonText });
      } else {
         this.props.openPay(this.state.params.levelId);
      }
   }


   render() {
      //console.log(this.state);
      //console.log(this.props);
      return (
         <StyledContainer>
            <Header title={this.state.params.titleBar} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
            <StyledBox contentContainerStyle={{ alignItems: "center" }}>
               <StyledImageContainer>
                  {this.state.courseActive ?
                     (
                        <StyledImageContainer>
                           <TopCard img={this.state.params} openVideo={this.props.openVideo}
                              TopCardAspectRatio={this.state.TopCardAspectRatio} width={this.state.width}
                           />
                           <StyledVideoBar>
                              <StyledText color={"Light"} weight={"SemiBold"}>{this.state.params.lessonName}</StyledText>
                           </StyledVideoBar>
                        </StyledImageContainer>
                     ) : (
                        <StyledImageContainer>
                           <TopCard img={this.state.params} openVideo={debounce(() => this.props.openPay(this.state.params.levelId), 1000, { leading: true, trailing: false })}
                              TopCardAspectRatio={this.state.TopCardAspectRatio} width={this.state.width}
                           />
                           <StyledFloatIcon>
                              <Icon name="lock-outline" size={24} color="#fefefe" />
                           </StyledFloatIcon>

                           <StyledVideoBar>
                              <StyledText color={"Light"} weight={"SemiBold"}>{this.state.params.lessonName}</StyledText>
                           </StyledVideoBar>
                        </StyledImageContainer>
                     )}
               </StyledImageContainer>
               <View style={{
                  backgroundColor: "white", elevation: 4, margin: 5,
                  padding: 5, borderRadius: 4, width: "90%"
               }}>
                  <TouchableOpacity onPress={this.onLesson}>
                     <View style={{ borderRadius: 2, flexDirection: "row", margin: 5 }}>
                        <View style={{ padding: 5, margin: 5, width: 100, height: 100, alignItems: "center", justifyContent: "center", borderRadius: 2, borderColor: "#d3d3d3", borderWidth: 1 }}>
                           <Icon name="music-note" color="goldenrod" size={70} />
                        </View>
                        <View style={{ justifyContent: "center", padding: 5, flexWrap: "nowrap", flex: 1 }}>
                           <AlignedText size={"Large"} color={"Grey"} weight={"SemiBold"} textalign={"Right"}>Lesson Notes</AlignedText>
                        </View>
                     </View>
                  </TouchableOpacity>
                  <View style={{ backgroundColor: "lightgrey", height: 1, width: "100%" }} />
                  <TouchableOpacity onPress={this.onPractice}>
                     <View style={{ borderRadius: 2, flexDirection: "row", margin: 5 }}>
                        <View style={{ justifyContent: "center", padding: 5, flexWrap: "nowrap", flex: 1 }}>
                           <AlignedText size={"Large"} color={"Grey"} weight={"SemiBold"} textalign={"Left"}>Practice Video</AlignedText>
                        </View>
                        <Image source={{ uri: this.state.params.lessonPracticeGuidePhI }} style={{ width: 100, aspectRatio: 1, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                     </View>
                  </TouchableOpacity>
               </View>
            </StyledBox>
         </StyledContainer>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   openVideo: (params) => {
      console.log('-------open video---------');
      dispatch({ type: 'OPEN_VIDEO', params })
   },

   openLesson: (params) => {
      dispatch(NavigationActions.navigate({ routeName: 'LessonNotes', params }));
   },

   openPay: (val) => {
      console.log('-------open pay---------');
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

export default LessonScreen = connect(mapStateToProps, mapDispatchToProps)(LScreen);

// Need to complete
// add touchables to  lesson notes and practice video
// create lesson notes page in home stack
// add user subscribe state
// if not subscribed add lock to page and show subscribe modal