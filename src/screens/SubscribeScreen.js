// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Picker,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
//   PixelRatio,
//   FlatList,
//   TouchableHighlight,
//   Image,
//   Button,
//   Dimensions,
//   Modal,
// } from 'react-native';

// import {connect} from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import firebase from 'react-native-firebase';
// import { StyledText, AlignedText } from '../UI';
// import Header from '../Component/Header';
// import { NavigationActions } from 'react-navigation';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 18,
//     textAlign: 'center',
//     margin: 5,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//      text: {
//       fontSize: 30,
//       alignSelf: 'center',
//       color: 'red'
//    },
//       bigButton: {
//     alignItems: 'center',
//         backgroundColor: '#6b38a5',
//         margin: 5,
//         height: 40,
//         marginLeft: 40,
//         marginRight: 40,
//         borderRadius: 2,
//         shadowColor: "#000000",
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//         shadowOffset: {
//         height: 1,
//         width: 0.3,}
//   }
// });

// class Subscribe extends Component {
//     constructor(props){
//     super(props);
//     this.ref = null;
//     let {height, width}  = Dimensions.get('window');

//     this.state={
//       isLoading:true,
//       data:null
//     }
//   }

//     componentDidMount() {
//       this.ref = firebase.database().ref();
//       var self = this;
//       this.ref.child('QuickSub').once('value')
//       .then(function(dataSnapshot) {
//         if(dataSnapshot.val()){
//         var data = dataSnapshot.val();
//         self.setState({data, isLoading:false})
//         }
//       })
//       .catch(err =>{
//         console.log(err);
//       });


//   };
//   componentWillUnmount() {
//     // Remember to remove listener
//     // Remember to unsubscribe firebase db.
//     if (this.ref) {
//       this.ref.off('value', this.handleUpdate);
//     }
//   };


//     handleUpdate = (snapshot) => {
//     if(snapshot.val()){
//         this.dataSource = snapshot.val() || {};
//         this.setState({
//         firstname: this.dataSource.userName,
//         email: this.dataSource.email,
//         phone:this.dataSource.phone,
//         isLoading: false,
//         });
//     } else {
//         // this.setState({email:" ", phone:" " });
//         }
//    }


//    _renderRow = (obj) => {
//     console.log(obj.item);
//     let rowData = obj.item;
//     return (
//       <TouchableOpacity onPress={() => this._showModal(rowData)}>
//       <View style={{elevation:1, borderRadius: 4,flexDirection:"row" , justifyContent:"center" , flexWrap: "nowrap", marginVertical:5, marginHorizontal:10}}>
//         <Image source = {{ uri: rowData.thumbNail }} style={{width: 100, aspectRatio : 1, borderTopLeftRadius: 2, borderBottomLeftRadius:2}} />
//         <View style={{justifyContent:"center", padding:5, flexWrap:"wrap", flex:1}}>
//         <AlignedText size={"Large"} weight={"SemiBold"}>{rowData.courseName}</AlignedText>
//         <AlignedText size={"Small"} textalign={"Justify"} color={"Grey"}>{rowData.courseDescription}</AlignedText>
//         </View>
//       </View>
//       </TouchableOpacity>
//      );
//    } 

//    _showModal = (rowData) => {
//     console.log(rowData);
//     this.props.openPay(rowData.levelId);
// }

// _hideModal = () => this.setState({ modalVisible: false})

//   render() {
//     if (this.state.isLoading) {
//     return (
//       <View style={{flex: 1, paddingTop: 20 ,justifyContent: 'center'}}>
//         <ActivityIndicator 
//         size={'large'}
//         color={'black'}/>
//         <Text style={{flex: -1, paddingTop: 20 ,textAlign: 'center'}}>Loading...</Text>
//       </View>
//     );
//    } else {
//    return (
//     <View style={{flex:1}}>
//     <Header title={"Subscribe"} leftNavMenu={true} leftNavFunc={this.props.openMenu}/>
//     <ScrollView style={{flex:1}}>
//               {/* <View
//               style={{
//         backgroundColor: "#ffbc00",
//         padding: 10,
//         margin: 10,
//         borderRadius: 4,
//         shadowColor: "#000000",
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//         shadowOffset: {
//         height: 1,
//         width: 0.3,}
//       }}
//         > 
//           <Text
//           style={{ textAlign:"center", color: "#333333"}}
//           > <Text>Welcome to Quick Subscribe!</Text></Text>
//         </View> */}


//    {/* <View style={{
//         borderRadius: 4,
//         shadowColor: "#000000",
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//         shadowOffset: {
//         height: 1,
//         width: 0.3,}}}>
//    <Text style={{paddingHorizontal: 7.5, fontSize: 72/4, fontFamily: "Nunito"}}> Our Courses</Text>
//    <FlatList 
//     data={this.state.data}
//     renderItem={(item) => this._renderRow(item)}
//     keyExtractor={(item, index) => item.levelId}
//    />
//    </View> */}
//   </ScrollView>
// </View>
//    )

//   }
// }
// }

// const mapStateToProps = state => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => ({

//   openMenu: () => {
//     dispatch(NavigationActions.navigate({routeName:'DrawerOpen' }))
//   },

//   openPay: (val) => {
//     // dispatch({type:'OPEN_LOGIN', params})

//     firebase.database().ref().child('levels').child(val).once('value')
//     .then(function(snapshot){
//       if(snapshot.val()){
//         let dataSource = snapshot.val() || {};
//         // console.log(snapshot.val());
//         dispatch({type: 'OPEN_PAY', params:dataSource });
//       } else {
//         Alert.alert(
//           'Error..! Server did not respond',
//           'Try again',
//           [
//             {text: 'OK', onPress: () => console.log("Error"), style: 'cancel'},
//           ],
//           { cancelable: true }
//         )
//       }
//     });
//   } ,

// });

// export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);




import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Picker,
   Platform,
   ScrollView,
   ActivityIndicator,
   PixelRatio,
   FlatList,
   TouchableHighlight,
   Image,
   Button,
   Dimensions,
   Modal,
} from 'react-native';
import debounce from 'lodash.debounce'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { StyledText, AlignedText, StyledFullWidthContainer } from '../UI';
import Header from '../Component/Header';
import { NavigationActions } from 'react-navigation';
import * as Progress from 'react-native-progress';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   welcome: {
      fontSize: 18,
      textAlign: 'center',
      margin: 5,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   bigButton: {
      alignItems: 'center',
      backgroundColor: '#6b38a5',
      margin: 5,
      height: 40,
      marginLeft: 40,
      marginRight: 40,
      borderRadius: 2,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 1,
      shadowOffset: {
         height: 1,
         width: 0.3,
      }
   }
});
var allCourseTemp
class Subscribe extends Component {
   constructor(props) {
      super(props);
      this.ref = null;
      let { height, width } = Dimensions.get('window');
      let sub = function () {

         if (props.user.userLogin) {
            if (props.user.user.LessonStatus !== null) {
               let LessonStatus = props.user.user.LessonStatus;
               console.log('LessonStatus--------------', LessonStatus);
               let lessonActiveCount = 0;
               for (const key in LessonStatus) {
                  if (LessonStatus.hasOwnProperty(key)) {
                     // console.log(key , " -> " , LessonStatus[key]);
                     let CurrentDate = new Date().getTime();
                     let rowData = LessonStatus[key]
                     // console.log(rowData.endDate-CurrentDate);
                     if (rowData.endDate - CurrentDate <= 0) {
                        // expired courses
                        lessonActiveCount = lessonActiveCount + 1;
                        // if (rowData.endDate - CurrentDate >= -86400000) {
                        //    // expired less than a day
                        //    lessonActiveCount = lessonActiveCount + 1;
                        // }
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
         loading: true,
         width: width,
         TopCardAspectRatio: 1.8,
         userLogin: props.user.userLogin,
         isSubscriber: sub,
         isLoading: true,
         data: null,
         allCourse: allCourseTemp
      }
      // this.state={
      //   isLoading:true,
      //   data:null
      // }
   }

   componentWillReceiveProps(nextProps) {
      let { appUi, user } = nextProps;
      let isSubscriber = null
      if (user.user.LessonStatus !== null) {
         let temp = user.user;
         let LessonStatus = temp.LessonStatus;

         let lessonActiveCount = 0;
         for (const key in LessonStatus) {
            if (LessonStatus.hasOwnProperty(key)) {
               // console.log(key , " -> " , LessonStatus[key]);
               let CurrentDate = new Date().getTime();
               let rowData = LessonStatus[key]
               // console.log(rowData.endDate-CurrentDate);
               if (rowData.endDate - CurrentDate <= 0) {
                  // expired courses
                  lessonActiveCount = lessonActiveCount + 1;
                  // if (rowData.endDate - CurrentDate >= -86400000) {
                  //    // expired less than a day
                  //    lessonActiveCount = lessonActiveCount + 1;
                  // }
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

   dateDiff = (date1, date2) => {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;
      var d = new Date(date2)
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
               <Progress.Bar color={'rgba(107, 56, 165, 1.0)'} borderRadius={6} progress={progressState} width={width * 0.5} height={10} animated={true} />
            </View>
         );
      } else {
         return null
      }
   }
   getCoursemodule = (courseId) => {
      for (let i = 0; i < this.state.allCourse.length; i++) {
         var levels = Object.values(this.state.allCourse[i].Levels)
         for (let j = 0; j < levels.length; j++) {
            if (courseId == levels[j].levelId) {
               return levels[j]
            }
         }
      }
   }

   getCourseName = (courseId) => {
      for (let i = 0; i < this.state.allCourse.length; i++) {
         var levels = Object.values(this.state.allCourse[i].Levels)
         for (let j = 0; j < levels.length; j++) {
            if (courseId == levels[j].levelId) {
               return this.state.allCourse[i]
            }
         }
      }
   }

   check = (val, zero) => {
      this.props.onViewWeekViewScreen(val, zero)
   }


   renderCourseCard = ({ item }) => {
      let Coursemodule = this.getCoursemodule(item.currentLevelId)
      let mainCourse = this.getCourseName(item.currentLevelId)
      let CurrentDate = new Date().getTime();
      let dateDiff = this.dateDiff(CurrentDate, parseInt(item.endDate));
      if (item.endDate - CurrentDate <= 0) {
         // console.log("expired but less than a day");
         //   return (
         //      <View style={{
         //         flex: 1, justifyContent: "space-between", flexWrap: "nowrap", backgroundColor: "white", elevation: 4, margin: 7.25
         //      }}>
         //         <AlignedText size={"Large"} padding={"0px 10px"} weight={"SemiBold"}>{item.currentLevelName}</AlignedText>
         //         <TouchableOpacity onPress={debounce(() => this.props.onViewAll(item.currentLessonId), 1000, { leading: true, trailing: false })}
         //            style={{ padding: 5, elevation: 5, margin: 5, }}>
         //            <View style={{ elevation: 1, width: '100%', borderRadius: 2, flexDirection: "row" }}>
         //               <Image source={{ uri: item.levelThumbNoPlayIcon }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
         //               <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
         //                  <AlignedText size={"Medium"}>{item.currentLessonName}</AlignedText>
         //                  <View style={{ flex: -1, paddingVertical: 5, marginLeft: -2 }}>
         //                     {this._renderProgress(item.currentStatusLevel)}
         //                  </View>
         //                  <AlignedText size={"Small"}>{item.currentStatus}</AlignedText>
         //               </View>
         //            </View>
         //         </TouchableOpacity>
         //         <View style={{ flexDirection: "row", flexWrap: "nowrap", flex: 1, alignItems: 'center', justifyContent: "space-between", marginHorizontal: 5 }}>
         //            <AlignedText size={"Medium"} padding={"5px"}>Your course has expired</AlignedText>
         //            <TouchableOpacity style={{
         //               borderRadius: 4,
         //               borderColor: '#e5e5e5',
         //               backgroundColor: '#6b38a5',
         //               borderWidth: 1,
         //               flex: 0.4,
         //               padding: 5, margin: 5,
         //               maxHeight: 30, justifyContent: "center", flexWrap: "nowrap",
         //            }} onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
         //               <AlignedText color={"HighLight"} weight={"SemiBold"} textalign={"Center"} padding={"2.5px 5px"}>Renew</AlignedText>
         //            </TouchableOpacity>
         //         </View>
         //      </View>
         //   )


         return (
            <View>
               <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 5, }}>
                  <View style={{
                     flexWrap: 'nowrap',
                     flexDirection: 'row',
                     padding: 10,
                     borderColor: "#e0e0e0",
                     borderWidth: 1, borderRadius: 3
                  }}>


                     {Coursemodule.hideCourse == 1 ?
                        <View >
                           <Image
                              style={{
                                 width: this.state.width * 30.1 / 90,
                                 // height: this.state.height* 25/139,
                                 aspectRatio: 1.1,
                                 paddingTop: 15,
                                 borderRadius: 6,
                                 borderColor: 'grey',
                              }}
                              source={{ uri: Coursemodule.levelThumbNoPlayIcon }}
                           />
                        </View>
                        :
                        <TouchableOpacity onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
                           <Image
                              style={{
                                 width: this.state.width * 30.1 / 90,
                                 // height: this.state.height* 25/139,
                                 aspectRatio: 1.1,
                                 paddingTop: 15,
                                 borderRadius: 6,
                                 borderColor: 'grey',
                              }}
                              source={{ uri: Coursemodule.levelThumbNoPlayIcon }}
                           />
                        </TouchableOpacity>
                     }




                     {/* <TouchableOpacity onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
                        <Image
                           style={{
                              width: this.state.width * 30.1 / 90, aspectRatio: 1.1,
                              paddingTop: 15,
                              borderRadius: 6,
                              borderColor: 'grey',
                           }}
                           source={{ uri: Coursemodule.levelThumbNoPlayIcon }}
                        />
                     </TouchableOpacity> */}
                     <View style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        paddingLeft: 10,
                        paddingRight: 5,
                        justifyContent: "space-between",
                     }}>
                        <View style={{ paddingLeft: 2.5 }}>
                           <StyledText weight={"Bold"}>
                              {mainCourse.courseTitile}
                           </StyledText>
                           <StyledText>
                              {Coursemodule.LevelTitleNew}
                           </StyledText>
                           <StyledText size={"Medium"} style={{ color: 'grey' }}>
                              {new Date(item.startDate).getDate()}/{new Date(item.startDate).getMonth() + 1}/{new Date(item.startDate).getFullYear()} - {new Date(item.endDate).getDate()}/{new Date(item.endDate).getMonth() + 1}/{new Date(item.endDate).getFullYear()}
                           </StyledText>
                        </View>


                        {Coursemodule.hideCourse == 1 ?
                           <View
                              style={{
                                 marginTop: 5,
                                 borderRadius: 4,
                                 borderColor: 'grey',
                                 borderWidth: 1,
                                 padding: 5
                              }}>
                              <Text style={{ color: 'grey', fontFamily: 'Nunito-Regular', fontSize: 12 }} >This version is no longer available for renewal. Please check out the latest version under 'Home -> Our Courses'.</Text>
                           </View>
                           :
                           <View
                              style={{
                                 flexDirection: 'row',
                                 backgroundColor: '#6b38a5',
                                 borderRadius: 4,
                              }}>
                              <TouchableOpacity onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}
                                 // this.onViewAll(this.state.Levels[val].levelId,this.state.Levels[val])
                                 style={{
                                    flexDirection: 'row',
                                    flexGrow: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignContent: "space-between",
                                    paddingVertical: 10,
                                 }}>
                                 <Text style={{ color: '#ffffff', marginRight: 5, fontFamily: 'Nunito-Bold' }} >
                                    Renew</Text>
                                 <Ionicons size={18} name="md-arrow-forward" color='#ffffff' />
                              </TouchableOpacity>
                           </View>
                        }



                        {/* <View
                           style={{
                              flexDirection: 'row',
                              backgroundColor: '#6b38a5',
                              borderRadius: 4,
                           }}>
                           <TouchableOpacity onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}
                              // this.onViewAll(this.state.Levels[val].levelId,this.state.Levels[val])
                              style={{
                                 flexDirection: 'row',
                                 flexGrow: 1,
                                 alignItems: "center",
                                 justifyContent: "center",
                                 alignContent: "space-between",
                                 paddingVertical: 10,
                              }}>
                              <Text style={{ color: '#ffbc00', marginRight: 5, fontFamily: 'Nunito-Regular' }} >
                                 Renew</Text>
                              <Ionicons size={18} name="md-arrow-forward" color='#ffbc00' />
                           </TouchableOpacity>
                        </View> */}
                     </View>
                  </View>
               </View>
            </View>
         )

      } else {
         // console.log("not expired"); 
         return (
            // <View style={{
            //    flex: 1, justifyContent: "space-between", flexWrap: "nowrap", backgroundColor: "white", elevation: 4, margin: 7.25
            // }}>
            //    <AlignedText size={"Large"} padding={"0px 10px"} weight={"SemiBold"}>{item.currentLevelName}</AlignedText>
            //    <TouchableOpacity onPress={debounce(() => this.props.onViewAll(item.currentLessonId), 1000, { leading: true, trailing: false })}
            //       style={{ padding: 5, elevation: 5, margin: 5, }}>
            //       <View style={{ elevation: 1, width: '100%', borderRadius: 2, flexDirection: "row" }}>
            //          <Image source={{ uri: item.levelThumbNoPlayIcon }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
            //          <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
            //             <AlignedText size={"Medium"}>{item.currentLessonName}</AlignedText>
            //             <View style={{ flex: -1, paddingVertical: 5, marginLeft: -2 }}>
            //                {this._renderProgress(item.currentStatusLevel)}
            //             </View>
            //             <AlignedText size={"Small"} textalign={"Justify"}>{item.currentStatus}</AlignedText>
            //          </View>
            //       </View>
            //    </TouchableOpacity>
            //    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginHorizontal: 5 }}>
            //       <View style={{ flex: -1 }}>
            //          <AlignedText size={"Medium"} padding={"1px 5px 5px 5px"}>{dateDiff} left.</AlignedText>
            //       </View>
            //       <TouchableOpacity style={{
            //          borderRadius: 4,
            //          borderColor: '#e5e5e5',
            //          backgroundColor: '#6b38a5',
            //          borderWidth: 1,
            //          padding: 5, margin: 5,
            //          maxHeight: 30, justifyContent: "center", minWidth: '20%',
            //       }} onPress={debounce(() => this.props.openPay(item.currentLevelId), 1000, { leading: true, trailing: false })}>
            //          <AlignedText color={"HighLight"} weight={"SemiBold"} textalign={"Center"} padding={"2.5px 5px"}>Extend</AlignedText>
            //       </TouchableOpacity>
            //    </View>
            // </View>

            <View>
               <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 5, }}>
                  <View style={{
                     flexWrap: 'nowrap',
                     flexDirection: 'row',
                     padding: 10,
                     borderColor: "#e0e0e0",
                     borderWidth: 1, borderRadius: 3
                  }}>
                     <TouchableOpacity onPress={debounce(() => this.check(item.currentLevelId, Coursemodule), 1000, { leading: true, trailing: false })}>
                        <Image
                           style={{
                              width: this.state.width * 30.1 / 90, aspectRatio: 1.1,
                              paddingTop: 15,
                              borderRadius: 6,
                              borderColor: 'grey',
                           }}
                           source={{ uri: Coursemodule.levelThumbNoPlayIcon }}
                        />
                     </TouchableOpacity>
                     <View style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        paddingLeft: 10,
                        paddingRight: 5,
                        justifyContent: "space-between",
                     }}>
                        <View style={{ paddingLeft: 2.5 }}>
                        <StyledText weight={"Bold"}>
                              {mainCourse.courseTitile}
                           </StyledText>
                           <StyledText>
                              {Coursemodule.LevelTitleNew}
                           </StyledText>
                           <StyledText size={"Medium"} style={{ color: 'grey' }}>
                              In progress, {dateDiff} left.
                           </StyledText>
                        </View>
                        <View
                           style={{
                              flexDirection: 'row',
                              backgroundColor: '#6b38a5',
                              borderRadius: 4,
                           }}>
                           <TouchableOpacity onPress={debounce(() => this.check(item.currentLevelId, Coursemodule), 1000, { leading: true, trailing: false })}
                              // this.onViewAll(this.state.Levels[val].levelId,this.state.Levels[val])
                              style={{
                                 flexDirection: 'row',
                                 flexGrow: 1,
                                 alignItems: "center",
                                 justifyContent: "center",
                                 alignContent: "space-between",
                                 paddingVertical: 10,
                              }}>
                              <Text style={{ color: '#ffffff', marginRight: 5, fontFamily: 'Nunito-Bold' }} >
                                 Continue Learning</Text>
                              <Ionicons size={18} name="md-arrow-forward" color='#ffffff' />
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </View>
            </View>
         )
      }
   }
   componentDidMount() {

      this.ref = firebase.database().ref();
      var self = this;

      firebase.database().ref().child('courses').once('value')
         .then(function (snapshot) {
            if (snapshot.val()) {
               var data = snapshot.val();
               self.setState({ allCourse: data })
            } else {

            }
         });

      this.ref.child('QuickSub').once('value')
         .then(function (dataSnapshot) {
            if (dataSnapshot.val()) {
               var data = dataSnapshot.val();
               self.setState({ data, isLoading: false })
            }
         })
         .catch(err => {
            console.log(err);
         });

   };
   componentWillUnmount() {
      // Remember to remove listener
      // Remember to unsubscribe firebase db.
      if (this.ref) {
         this.ref.off('value', this.handleUpdate);
      }
   };

   handleUpdate = (snapshot) => {
      if (snapshot.val()) {
         this.dataSource = snapshot.val() || {};
         this.setState({
            firstname: this.dataSource.userName,
            email: this.dataSource.email,
            phone: this.dataSource.phone,
            isLoading: false,
         });
      } else {
         // this.setState({email:" ", phone:" " });
      }
   }

   _renderRow = (obj) => {
      console.log(obj.item);
      let rowData = obj.item;
      return (
         <TouchableOpacity onPress={() => this._showModal(rowData)}>
            <View style={{ elevation: 1, borderRadius: 4, flexDirection: "row", justifyContent: "center", flexWrap: "nowrap", marginVertical: 5, marginHorizontal: 10 }}>
               <Image source={{ uri: rowData.thumbNail }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
               <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
                  <AlignedText size={"Large"} weight={"SemiBold"}>{rowData.courseName}</AlignedText>
                  <AlignedText size={"Small"} textalign={"Justify"} color={"Grey"}>{rowData.courseDescription}</AlignedText>
               </View>
            </View>
         </TouchableOpacity>
      );
   }

   _showModal = (rowData) => {
      console.log(rowData);
      this.props.openPay(rowData.levelId);
   }

   _hideModal = () => this.setState({ modalVisible: false })

   render() {

      let CurrentDate = new Date().getTime();
      if(this.state.user.LessonStatus){
         var tempArray = Object.values(this.state.user.LessonStatus)
         var SubscribedCourse = new Array()
         var unSubscribedCourse = new Array()
   
         for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].endDate - CurrentDate <= 0) {
               unSubscribedCourse.push(tempArray[i])
               unSubscribedCourse.sort(function (a, b) {
                  return new Date(parseInt(b.startDate)) - new Date(parseInt(a.startDate));
               });
               console.log('sorted unSubscribedCourse----', unSubscribedCourse)
            } else {
               SubscribedCourse.push(tempArray[i])
               SubscribedCourse.sort(function (a, b) {
                  return new Date(parseInt(b.startDate)) - new Date(parseInt(a.startDate));
               });
               console.log('sorted SubscribedCourse----', SubscribedCourse)
            }
         }
      }
     
      if (this.state.isLoading) {
         return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center' }}>
               <ActivityIndicator
                  size={'large'}
                  color={'black'} />
               <Text style={{ flex: -1, paddingTop: 20, textAlign: 'center' }}>Loading...</Text>
            </View>
         );
      } else {

         return (
            <View style={{ flex: 1 }}>
               <Header title={"Subscribe"} leftNavMenu={true} leftNavFunc={this.props.openMenu} />

               {/* <View
              style={{
        backgroundColor: "#ffbc00",
        padding: 10,
        margin: 10,
        borderRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0.3,}
      }}
        > 
          <Text style={{ textAlign:"center", color: "#333333"}}> <Text>Welcome to Quick Subscribe!</Text></Text>
        </View> */}
               {this.state.isSubscriber ? (
                  <ScrollView >
                     <StyledFullWidthContainer>

                        {/* <FlatList
                           keyExtractor={item => item.currentLevelId}
                           data={this.state.subabc}
                           renderItem={this.renderCourseCard}
                           extraData={this.state}
                        /> */}
                        <FlatList
                           keyExtractor={item => item.currentLevelId}
                           data={SubscribedCourse}
                           renderItem={this.renderCourseCard}
                           extraData={this.state}
                        />
                        <FlatList
                           keyExtractor={item => item.currentLevelId}
                           data={unSubscribedCourse}
                           renderItem={this.renderCourseCard}
                           extraData={this.state}
                        />
                     </StyledFullWidthContainer>
                  </ScrollView>
               ) :
                  (
                     // <View style={{ height: '100%', flex: 1, display: 'flex',}}>
                     //    <Text style={{ color: 'grey', fontFamily: "Nunito-Regular", textAlign: 'center', padding: 5 }}> No courses yet. Subscribe now and begin your musical journey!</Text>
                     // </View>

                     <View style={{ height: '100%', paddingHorizontal: 10, flex: 1, alignItems: 'center', paddingTop: 30 }}>
                        <Text style={{ color: 'grey', fontFamily: "Nunito-Regular" }}>No courses yet.</Text>
                        <Text style={{ color: 'grey', fontFamily: "Nunito-Regular" }}>Subscribe now and begin your musical journey!</Text>
                     </View>
                  )
               }

               {/* <View style={{
        borderRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0.3,}}}>
   <Text style={{paddingHorizontal: 7.5, fontSize: 72/4, fontFamily: "Nunito"}}> Our Courses</Text>
   <FlatList 
    data={this.state.data}
    renderItem={(item) => this._renderRow(item)}
    keyExtractor={(item, index) => item.levelId}
   />
   </View> */}
            </View>
         )

      }
   }
}

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({

   openMenu: () => {
      dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))
   },

   openPay: (val) => {
      // dispatch({type:'OPEN_LOGIN', params})

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

   onViewWeekViewScreen: (val, zero) => {
      //console.log(val);
      //console.log(zero);
      firebase.database().ref().child('levels').child(val).once('value')
         .then(function (snapshot) {
            if (snapshot.val()) {
               let dataSource = snapshot.val() || {};
               //console.log(dataSource , zero);
               dispatch(NavigationActions.navigate({ routeName: 'WeekViewScreen', params: { ...dataSource, zero } }));
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
         }).catch((error) => {
            //console.log(error);
         });
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);