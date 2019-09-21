// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   TouchableHighlight,
//   Image,
//   Text,
//   FlatList,
//   Alert,
//   ScrollView
// } from 'react-native';
// import Header from '../Component/Header';
// import {StyledText, StyledImageCard, StyledContainer, StyledBox, StyledImageContainer, StyledListContainer, StyledVideoBar, AlignedText} from '../UI';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {NavigationActions} from 'react-navigation';
// import { connect } from 'react-redux';
// import firebase from 'react-native-firebase';
// import * as Progress from 'react-native-progress';
// import LessonCard from '../Component/LessonCard';

// const debounce = require('lodash.debounce');

// // Need to implement section list.
// // add user current course state if subscribed.
// // Trigger subscription modal.
// // trigger lesson info page.


// class WVScreen extends React.Component {

//   constructor(props){
//     super(props);
//     let myRe = null;
//     let myArray = null;
//     let newNum = null;
//     let arrowRotate = 0;
//     let lessonName = null;
//     let courseActive = false;

//     if(this.props.user.user.LessonStatus){
//       if(this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId]){
//         myRe = new RegExp('[1-9][0-9]?$', 'g');
//         myArray = myRe.exec(this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonId);
//         newNum = Number(myArray[0]);
//         arrowRotate = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonWeekId;
//         lessonName = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonName;
//         courseActive = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId] && this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].endDate > new Date().getTime()
//      }
//     }



//     this.state = {
//       currentLessonNum: newNum,
//       arrowRotate, lessonName,
//       courseActive
//     };

//   }

//   componentWillReceiveProps(nextProps){

//     let myRe = null;
//     let myArray = null;
//     let newNum = null;
//     let arrowRotate = 0;
//     let lessonName = null;
//     let courseActive = false;

//     if(this.props.user.user.LessonStatus){
//     if(nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId]){
//       myRe = new RegExp('[1-9][0-9]?$', 'g');
//       myArray = myRe.exec(nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonId);
//       newNum = Number(myArray[0]);
//       arrowRotate = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonWeekId;
//       lessonName = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonName;
//       courseActive = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId] && nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].endDate > new Date().getTime()
//    }
//   }
//     this.setState({currentLessonNum: newNum,
//       arrowRotate, lessonName,courseActive})
//   }


// _renderCard = ({item}) =>{
//   console.log('----------------',this.props.navigation.state.params);
//   return(
//     <LessonCard item={item} params={this.props.navigation.state.params} onViewAll={this.props.onViewAll}
//       lessonName={this.state.lessonName} courseActive={this.state.courseActive} currentLessonNum={this.state.currentLessonNum}
//     />
//   )
// }

// _renderContent = (section) => {
//   if (section.index != this.state.arrowRotate) { 
//     return(
//       <TouchableOpacity onPress={() => this._onclick(section.index)}>
//       <View style={{ backgroundColor: "white", elevation:4, margin: 5, borderWidth: 1, padding: 5, 
//       alignItems:"baseline", paddingRight: 10, borderRadius: 4,
//       flexDirection:"row" , borderColor:"#fefefe", justifyContent:"space-between" , flexWrap: "nowrap"}}>
//       <AlignedText weight={"SemiBold"} padding={"5px"}>{section.title}</AlignedText>
//       <Icon size={28} name="keyboard-arrow-down" color='black' />
//       </View>
//       </TouchableOpacity>
//     )
//   }
//   else {
//     return(
//       <View>
//       <TouchableOpacity onPress={this._onclick}>
//       <View style={{ backgroundColor: "white", elevation:4, margin: 5, borderWidth: 1, padding: 5, 
//       alignItems:"baseline", paddingRight: 10, borderRadius: 4,
//       flexDirection:"row" , borderColor:"goldenrod", justifyContent:"space-between" , flexWrap: "nowrap"}}>
//       <AlignedText weight={"SemiBold"} padding={"5px"}>{section.title}</AlignedText>
//       <Icon size={28} name="keyboard-arrow-up" color='black' />
//       </View>
//       </TouchableOpacity>
//       <View style={{ backgroundColor: "white", elevation:4, margin: 5}}>
//       <FlatList
//       data={section.content}
//       renderItem={this._renderCard}
//       keyExtractor={(item, index) => item.lessonId}
//       extraData={this.state}
//       />
//       </View>
//       </View>
//     )
//   }
// }
// _onclick = (arrowRotate) => {
//   // updater functions are preferred for transactional updates
//   this.setState((state) => {
//     // copy the map rather than modifying state.
//     return arrowRotate !== false ? {arrowRotate} : {arrowRotate : -1};
//   });
// };

//   render() {    
//     //console.log(this.props.navigation.state.params);
//     //console.log(this.props.user);
//     //console.log(this.state);

//     // this.props.user.user.LessonStatus.currentLessonWeekId => set this to arrow rotate.
//     // this.props.user.user.LessonStatus.currentLessonId => set this for check mark if lesser, show alert if greater
//     // this.props.user.user.LessonStatus.currentStatusLevel => progress level
//     // 
//     return (
//       <View style={{flex:1}}>
//       <Header title={"Course Plan"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())}/>




//       <ScrollView>
//       { this.props.navigation.state.params.zero && (
//                   <View style={{padding: 7.5, flexDirection: "row",}}>
//                   <View style={{elevation:1, borderRadius: 2,flex:1, flexDirection: "row", backgroundColor:"#fefefe" }}>
//                   <TouchableOpacity  onPress={()=> this.props.openVideo(this.props.navigation.state.params.zero.videoId)}>
//                   <Image style={{width: 110, aspectRatio : 1, borderTopLeftRadius: 2, borderBottomLeftRadius:2}}
//                   source={{uri:this.props.navigation.state.params.zero.levelThumbnail}}/>
//                   </TouchableOpacity>

//                   <View style={{justifyContent:"center", paddingHorizontal:5, flexWrap:"nowrap", flex:1}}>
//                   <AlignedText size={"Large"} weight={"SemiBold"}>
//                   {this.props.navigation.state.params.zero.levelTitle}              
//                   </AlignedText>
//                   <AlignedText size={"Medium"} textalign={"Justify"}>
//                   {this.props.navigation.state.params.zero.levelDesc}
//                   </AlignedText>

//                   </View>
//                   </View>
//           </View>)
//         }      

//       <FlatList 
//       data={this.props.navigation.state.params.SECTIONS}
//       renderItem={({item}) => this._renderContent(item)}
//       keyExtractor={(item, index) => item.title}
//       extraData={this.state}
//       />
//       </ScrollView>
//               {(!this.state.courseActive) && ( 
//                 <View
//                 style={{
//                   flex: 0.1,
//                   flexDirection: 'row',
//                   position: 'absolute',
//                   // left: this.state.width*0.25,
//                   bottom:0,
//                   opacity: 1,
//                   padding: 5,
//                   height: 50,
//                   justifyContent:'center',
//                   paddingTop: 10,
//                   alignSelf:"center"
//                 }}> 

//              <TouchableOpacity  onPress={()=>this.props.openPay(this.props.navigation.state.params)}> 
//              <View 
//              style={{
//                flex: 1,
//               backgroundColor: '#6b38a5',
//               flexDirection: 'row',
//               paddingHorizontal: 30,
//               paddingVertical: 5,
//               borderWidth: 1,
//               borderRadius: 2,
//               borderColor: 'grey',
//               shadowColor: "#000000",
//               shadowOpacity: 0.3,
//               shadowOffset: {
//               height: 1,
//               width: 0.3,}
//              }}>
//              <Icon size={20} color="#ffffff" name="subscriptions"/>
//              <Text
//             style={{
//               textAlign: 'center',
//             color:'#ffffff',
//             fontSize: 18,
//             }}> Subscribe</Text> 
//              </View>
//              </TouchableOpacity>
//             </View>)}

//               </View>)}
// }

// const mapStateToProps = state => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => ({
//   openVideo: (params) => {
//     dispatch({type:'OPEN_VIDEO', params})
//   },
//   onViewAll: (val, isActive, progressState, lessonName, courseActive, params) =>{
//     if (courseActive || !isActive) {
//       if( isActive && progressState > 0 && progressState <=1){
//         firebase.database().ref().child('lessons').child(val).once('value')
//         .then(function(snapshot){
//           if(snapshot.val()){
//             let dataSource = snapshot.val() || {};
//            // console.log(snapshot.val());

//             dispatch(NavigationActions.navigate({routeName:'LessonScreen', params:dataSource }));
//           } else {
//             Alert.alert(
//               'Error..! Server did not respond',
//               'Try again',
//               [
//                 {text: 'OK', onPress: () => console.log("Error"), style: 'cancel'},
//               ],
//               { cancelable: true }
//             )
//           }
//         });
//       }else {
//         if(!isActive){
//           firebase.database().ref().child('lessons').child(val).once('value')
//           .then(function(snapshot){
//             if(snapshot.val()){
//               let dataSource = snapshot.val() || {};
//              // console.log(snapshot.val());

//               dispatch(NavigationActions.navigate({routeName:'LessonScreen', params:dataSource }));
//             } else {
//               Alert.alert(
//                 'Error..! Server did not respond',
//                 'Try again',
//                 [
//                   {text: 'OK', onPress: () => console.log("Error"), style: 'cancel'},
//                 ],
//                 { cancelable: true }
//               )
//             }
//           });
//         } else {
//           Alert.alert(
//             `Not just yet! :-) `,
//             `Please complete ${lessonName}`,
//             [
//               {text: 'OK', onPress: () => console.log("User Error"), style: 'cancel'},
//             ],
//             { cancelable: true }
//           )
//         }
//       }
//     } else {
//       Alert.alert(
//         `Alert! Course has expired.`,
//         'Do you want to re-subscribe',
//         [
//           {text: 'OK', onPress: () => dispatch({type:'OPEN_PAY', params}), style: 'cancel'},
//         ],
//         { cancelable: true }
//       )
//     }

//   },
//   openPay: (params) => {
//     // dispatch({type:'OPEN_LOGIN', params})
//     dispatch({type:'OPEN_PAY', params});
//   } ,

//   openVideo: (params) => {
//     dispatch({type:'OPEN_VIDEO', params})
//   },


// });

// export default WeekViewScreen =  connect(mapStateToProps, mapDispatchToProps)(WVScreen);


import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  FlatList,
  Alert,
  ScrollView, Dimensions
} from 'react-native';
import Header from '../Component/Header';
import { StyledText, StyledImageCard, StyledContainer, StyledBox, StyledImageContainer, StyledListContainer, StyledVideoBar, AlignedText } from '../UI';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';
import LessonCard from '../Component/LessonCard';

const debounce = require('lodash.debounce');

// Need to implement section list.
// add user current course state if subscribed.
// Trigger subscription modal.
// trigger lesson info page.


class WVScreen extends React.Component {

  constructor(props) {
    super(props);
    let myRe = null;
    let myArray = null;
    let newNum = null;
    let arrowRotate = 0;
    let lessonName = null;
    let courseActive = false;

    if (this.props.user.user.LessonStatus) {
      if (this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId]) {
        myRe = new RegExp('[1-9][0-9]?$', 'g');
        myArray = myRe.exec(this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonId);
        newNum = Number(myArray[0]);
        arrowRotate = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonWeekId;
        lessonName = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].currentLessonName;
        courseActive = this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId] && this.props.user.user.LessonStatus[this.props.navigation.state.params.info.currentLevelId].endDate > new Date().getTime()
      }
    }



    this.state = {
      currentLessonNum: newNum,
      arrowRotate, lessonName,
      courseActive
    };

  }

  componentWillReceiveProps(nextProps) {

    let myRe = null;
    let myArray = null;
    let newNum = null;
    let arrowRotate = 0;
    let lessonName = null;
    let courseActive = false;

    if (this.props.user.user.LessonStatus) {
      if (nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId]) {
        myRe = new RegExp('[1-9][0-9]?$', 'g');
        myArray = myRe.exec(nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonId);
        newNum = Number(myArray[0]);
        arrowRotate = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonWeekId;
        lessonName = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].currentLessonName;
        courseActive = nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId] && nextProps.user.user.LessonStatus[nextProps.navigation.state.params.info.currentLevelId].endDate > new Date().getTime()
      }
    }
    this.setState({
      currentLessonNum: newNum,
      arrowRotate, lessonName, courseActive
    })
  }


  _renderCard = ({ item }) => {
    return (
      <LessonCard item={item} params={this.props.navigation.state.params} onViewAll={this.props.onViewAll}
        lessonName={this.state.lessonName} courseActive={this.state.courseActive} currentLessonNum={this.state.currentLessonNum}
      />
    )
  }

  _renderContent = (section) => {
    return (
      <FlatList
        data={section.content}
        renderItem={this._renderCard}
        keyExtractor={(item, index) => item.lessonId}
        extraData={this.state}
      />
    )

    // if (section.index != this.state.arrowRotate) { 
    //   return(
    //     <TouchableOpacity onPress={() => this._onclick(section.index)}>
    //     <View style={{ backgroundColor: "white", elevation:4, margin: 5, borderWidth: 1, padding: 5, 
    //     alignItems:"baseline", paddingRight: 10, borderRadius: 4,
    //     flexDirection:"row" , borderColor:"#fefefe", justifyContent:"space-between" , flexWrap: "nowrap"}}>
    //     <AlignedText weight={"SemiBold"} padding={"5px"}>{section.title}</AlignedText>
    //     <Icon size={28} name="keyboard-arrow-down" color='black' />
    //     </View>
    //     </TouchableOpacity>
    //   )
    // }
    // else {
    //   return(
    //     <View>
    //     {/* <TouchableOpacity onPress={this._onclick}>
    //     <View style={{ backgroundColor: "white", elevation:4, margin: 5, borderWidth: 1, padding: 5, 
    //     alignItems:"baseline", paddingRight: 10, borderRadius: 4,
    //     flexDirection:"row" , borderColor:"goldenrod", justifyContent:"space-between" , flexWrap: "nowrap"}}>
    //     <AlignedText weight={"SemiBold"} padding={"5px"}>{section.title}</AlignedText>
    //     <Icon size={28} name="keyboard-arrow-up" color='black' />
    //     </View>
    //     </TouchableOpacity> */}
    //     <View style={{ backgroundColor: "white", elevation:4, margin: 5}}>
    //     <FlatList
    //     data={section.content}
    //     renderItem={this._renderCard}
    //     keyExtractor={(item, index) => item.lessonId}
    //     extraData={this.state}
    //     />
    //     </View>
    //     </View>
    //   )
    // }
  }
  _onclick = (arrowRotate) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      return arrowRotate !== false ? { arrowRotate } : { arrowRotate: -1 };
    });
  };

  render() {
    //console.log(this.props.navigation.state.params);
    //console.log(this.props.user);
    //console.log(this.state);

    // this.props.user.user.LessonStatus.currentLessonWeekId => set this to arrow rotate.
    // this.props.user.user.LessonStatus.currentLessonId => set this for check mark if lesser, show alert if greater
    // this.props.user.user.LessonStatus.currentStatusLevel => progress level
    // 

    var courseCount = 0
    for (let i = 0; i < this.props.navigation.state.params.SECTIONS.length; i++) {
      for (let j = 0; j < this.props.navigation.state.params.SECTIONS[i].content.length; j++) {
        courseCount = courseCount + 1
      }
    }
    return (
      <View style={{ flex: 1, }}>
        <Header title={"Course Plan ( " + (courseCount + 1) + " Lessons )"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />




        <ScrollView style={{ backgroundColor: 'grey' }} style={{ marginBottom: !this.state.courseActive ? 50 : 0 }}>
          {this.props.navigation.state.params.zero && (
            <View >
              <View style={{ marginTop: 6, marginBottom: 3, marginHorizontal: 6, backgroundColor: '#fff' }}>
                <View style={{ padding: 4, borderRadius: 2, flexDirection: "row", }}>
                  <TouchableOpacity onPress={() => this.props.openVideo(this.props.navigation.state.params.zero.videoId)}>
                    <Image style={{ width: 100, aspectRatio: 1, borderRadius: 10 }}
                      source={{ uri: this.props.navigation.state.params.zero.levelThumbnail }} />
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center", paddingHorizontal: 5, flexWrap: "nowrap", flex: 1 }}>
                    <StyledText weight={"SemiBold"}>
                      {this.props.navigation.state.params.zero.levelTitle}
                    </StyledText>
                    <StyledText size={"Medium"}>
                      {this.props.navigation.state.params.zero.levelDesc}
                    </StyledText>
                    {/* <AlignedText size={"Large"} weight={"SemiBold"}>
                      {this.props.navigation.state.params.zero.levelTitle}
                    </AlignedText>
                    <AlignedText size={"Medium"} textalign={"Justify"}>
                      {this.props.navigation.state.params.zero.levelDesc}
                    </AlignedText> */}
                  </View>
                </View>
              </View>
            </View>
          )
          }
          <FlatList
            data={this.props.navigation.state.params.SECTIONS}
            renderItem={({ item }) => this._renderContent(item)}
            keyExtractor={(item, index) => item.title}
            extraData={this.state}
          />
        </ScrollView>
        {(!this.state.courseActive) && (
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              position: 'absolute',
              // left: this.state.width*0.25,
              bottom: 0,
              opacity: 1,
              height: 50,
              justifyContent: 'center',
              paddingTop: 0,
              alignSelf: "center",
            }}>

            <TouchableOpacity onPress={() => this.props.openPay(this.props.navigation.state.params)}>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#6b38a5',
                  flexDirection: 'row',
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                }}>
                <Icon size={20} color="#ffffff" name="subscriptions" />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: 18,
                  }}> Subscribe</Text>
              </View>
            </TouchableOpacity>
          </View>)}

      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  openVideo: (params) => {
    dispatch({ type: 'OPEN_VIDEO', params })
  },
  onViewAll: (val, isActive, progressState, lessonName, courseActive, params) => {


    if (!courseActive) {
      dispatch({ type: 'OPEN_PAY', params });
    } else {
      if (courseActive || !isActive) {
        if (isActive && progressState > 0 && progressState <= 1) {
          firebase.database().ref().child('lessons').child(val).once('value')
            .then(function (snapshot) {
              if (snapshot.val()) {
                let dataSource = snapshot.val() || {};
                // console.log(snapshot.val());

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
        } else {
          // if (!isActive) {
          firebase.database().ref().child('lessons').child(val).once('value')
            .then(function (snapshot) {
              if (snapshot.val()) {
                let dataSource = snapshot.val() || {};
                // console.log(snapshot.val());

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
          // } else {
          //   Alert.alert(
          //     `Not just yet! :-) `,
          //     `Please complete ${lessonName}`,
          //     [
          //       { text: 'OK', onPress: () => console.log("User Error"), style: 'cancel' },
          //     ],
          //     { cancelable: true }
          //   )
          // }
        }
      } else {
        Alert.alert(
          `Alert! Course has expired.`,
          'Do you want to re-subscribe',
          [
            { text: 'OK', onPress: () => dispatch({ type: 'OPEN_PAY', params }), style: 'cancel' },
          ],
          { cancelable: true }
        )
      }
    }
  },
  openPay: (params) => {
    // dispatch({type:'OPEN_LOGIN', params})
    dispatch({ type: 'OPEN_PAY', params });
  },

  openVideo: (params) => {
    dispatch({ type: 'OPEN_VIDEO', params })
  },


});

export default WeekViewScreen = connect(mapStateToProps, mapDispatchToProps)(WVScreen);