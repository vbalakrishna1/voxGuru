import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Share,
   TouchableHighlight,
   Modal,
   ScrollView,
   ImageBackground,
   BackHandler,
   Alert,
   Text,
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
      // alert(this.props.navigation.state.params.title.concat("_" , this.state.Levels[val].LevelTitleNew.replace(/[- )(]/g,'') ));
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

   onPracticex = () => {
      if (this.state.courseActive || this.props.navigation.state.params.isZero === true) {
         var levelId = this.props.navigation.state.params.levelId;
         // var currentStatusLevel = this.props.user.user.LessonStatus[levelId].currentStatusLevel;
         console.log("Male Practice Video", this.props.navigation.state.params.Male_prac_video);
         this.props.openVideo(this.props.navigation.state.params.Male_prac_video);
      } else {
         this.props.openPay(this.state.params.levelId);
      }
   }

   onPractice = () => {
      if (this.state.courseActive || this.props.navigation.state.params.isZero === true) {

         var levelId = this.props.navigation.state.params.levelId;
         // var currentStatusLevel = this.props.user.user.LessonStatus[levelId].currentStatusLevel;
         console.log("Female Practice Video", this.props.navigation.state.lessonPracticeGuideVideo);
         this.props.openVideo(this.props.navigation.state.params.lessonPracticeGuideVideo);

         // if (this.props.user.user.LessonStatus[levelId].currentStatusLevel < 0.5 &&
         //    this.props.user.user.LessonStatus[levelId].currentLessonId
         //    == this.state.params.lessonId) {
         //    Alert.alert(
         //       'Not just yet! :-)',
         //       'Please complete the main lesson before practice!',
         //       [
         //          { text: 'OK', onPress: () => console.log("Error"), style: 'cancel' },
         //       ],
         //       { cancelable: true }
         //    )

         // } else {
         //    // implement practice video open.
         //    this.props.openVideo(this.props.navigation.state.params.lessonPracticeGuideVideo);
         // }
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
      
      let noVideo = false;
      let pracVideo = false;

      if(!this.state.params.Male_prac_video && !this.state.params.lessonPracticeGuideVideo) {
         noVideo = true;
      }

      if(!this.state.params.Male_prac_video && this.state.params.lessonPracticeGuideVideo) {
         pracVideo = true;
      }

      console.log("Parameters", this.state.params);
      return (
         <StyledContainer style={{flex: 1, alignItems: 'center'}}>
            <Header title={this.state.params.lessonName} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
            <ScrollView style={{flex: 1, width: '100%', backgroundColor: "#E0E0E0", padding: 10, paddingTop: 2}}>
               <View style={{backgroundColor: "#FFFFFF", width: '100%', marginTop: 5, borderColor: "#f7f7f7", alignItems: 'center', borderWidth: 1}}>
                  <Text style={{fontSize: 20, paddingTop: 10, color: "#000000"}}>Main Lesson</Text>
                  <StyledImageContainer style={{backgroundColor: "#FFFFFF", alignItems: 'center', padding: 10}}>
                     {this.state.courseActive || this.props.navigation.state.params.isZero === true ?
                        (
                           <StyledImageContainer>
                              <TopCard img={this.state.params} openVideo={this.props.openVideo}
                                 TopCardAspectRatio={this.state.TopCardAspectRatio} width={'100%'}
                                 isHomepage = {false}
                              />
                           </StyledImageContainer>
                        ) : (
                           <StyledImageContainer>
                              <TopCard img={this.state.params} openVideo={debounce(() => this.props.openPay(this.state.params.levelId), 1000, { leading: true, trailing: false })}
                                 TopCardAspectRatio={this.state.TopCardAspectRatio}  width={'100%'} isHomepage = {false}
                              />
                              <StyledFloatIcon>
                                 <Icon name="lock-outline" size={24} color="#fefefe" />
                              </StyledFloatIcon>
                           </StyledImageContainer>
                        )}
                  </StyledImageContainer>
               </View>
               <View style={{backgroundColor: "#FFFFFF", width: '100%', marginTop: 10, marginBottom: 10, borderColor: "#f7f7f7", alignItems: 'center', borderWidth: 1}}>
                  <Text style={{fontSize: 20, paddingTop: 10, color: "#000000"}}>Practice Lesson</Text>
                  {
                     /* Female Video */
                     this.state.params.Male_prac_video ? (
                        <View style={{width: '100%'}}>
                           <View style={{backgroundColor: "#FFFFFF", padding: 10, width: '100%'}}>
                              <View style={{backgroundColor: "white", borderWidth: 1, borderColor: "#E0E0E0", width: "100%"}}>
                                 <TouchableOpacity onPress={this.onPractice}>
                                    <View style={{ flexDirection: "row", margin: 5 }}>
                                       <View style={{ justifyContent: "center", padding: 5, flexWrap: "nowrap", flex: 1 }}>
                                          <AlignedText size={"Large"} color={"Grey"} weight={"normal"} textalign={"Left"}>Female practice track</AlignedText>
                                       </View>
                                       <View style={{borderRadius: 8, borderColor: "#693e96", borderWidth: 1}}>
                                          <ImageBackground source={require('../images/female_doodle.png')} style={{ width: 100, aspectRatio: 1 }}>
                                             <Image source={require('../images/play_button.png')} style={{ width: 100, height: 100 }} />
                                          </ImageBackground>
                                       </View>
                                    </View>
                                 </TouchableOpacity>
                              </View>
                           </View>
                           {/* Male Video */}
                           <View style={{backgroundColor: "#FFFFFF", paddingTop: 0, padding: 10, width: '100%'}}>
                              <View style={{backgroundColor: "white", borderWidth: 1, borderColor: "#E0E0E0", width: "100%"}}>
                                 <TouchableOpacity onPress={this.onPracticex}>
                                    <View style={{ flexDirection: "row", margin: 5 }}>
                                       <View style={{ justifyContent: "center", padding: 5, flexWrap: "nowrap", flex: 1 }}>
                                          <AlignedText size={"Large"} color={"Grey"} weight={"normal"} textalign={"Left"}>Male practice track</AlignedText>
                                       </View>
                                       <View style={{borderRadius: 8, borderColor: "#693e96", borderWidth: 1}}>
                                          <ImageBackground source={require('../images/male_doodle.png')} style={{ width: 100, aspectRatio: 1 }}>
                                             <Image resizeMode="contain" source={require('../images/play_button.png')} style={{ width: 100, height: 100 }} />
                                          </ImageBackground>
                                       </View>
                                    </View>
                                 </TouchableOpacity>
                              </View>
                           </View>
                        </View>
                     ) : (
                        console.log("No Male Video")
                     )
                  }

                  {
                     noVideo ? (
                        <Text style={{ padding: 10, margin: 10, marginBottom: 20, fontStyle: 'italic', color: "#999999", textTransform: "uppercase", fontSize: 12}}>No Practice Lessons</Text>
                     ) : (
                        console.log("Yes Video!")
                     )
                  }

                  {
                     pracVideo ? (
                        <View style={{width: '100%'}}>
                           <View style={{backgroundColor: "#FFFFFF", padding: 10, width: '100%'}}>
                              <View style={{backgroundColor: "white", borderWidth: 1, borderColor: "#E0E0E0", width: "100%"}}>
                                 <TouchableOpacity onPress={this.onPractice}>
                                    <View style={{ flexDirection: "row", margin: 5 }}>
                                       <View style={{ justifyContent: "center", padding: 5, flexWrap: "nowrap", flex: 1 }}>
                                          <AlignedText size={"Large"} color={"Grey"} weight={"normal"} textalign={"Left"}>Practice now</AlignedText>
                                       </View>
                                       <View style={{borderRadius: 8, borderColor: "#693e96", borderWidth: 1}}>
                                          <ImageBackground source={require('../images/female_doodle.png')} style={{ width: 100, aspectRatio: 1 }}>
                                             <Image source={require('../images/play_button.png')} style={{ width: 100, height: 100 }} />
                                          </ImageBackground>
                                       </View>
                                    </View>
                                 </TouchableOpacity>
                              </View>
                           </View>
                        </View>
                     ) : (
                        console.log("No PracVideo!")
                     )
                  }
               </View>
            </ScrollView>
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
               console.log('---------------------',snapshot.val());
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