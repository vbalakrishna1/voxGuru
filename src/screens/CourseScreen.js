import debounce from 'lodash.debounce';
import React from 'react';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import TopCard from '../Component/TopCard';
import { StyledBox, StyledContainer, StyledImageContainer, StyledText } from '../UI';

class CScreen extends React.Component {

   constructor(props) {
      super(props);
      const { width, height } = Dimensions.get('window');
      this.state = {
         user: props.user || {},
         userLogin: props.user.userLogin,
         params: props.navigation.state.params,
         selectedCustomSegment: 0,
         width, height,
         Beginner: props.navigation.state.params["Beginner"],
         Intermediate: props.navigation.state.params["Intermediate"],
         Advanced: props.navigation.state.params["Advanced"],
         Levels: props.navigation.state.params["Levels"],
         TopCardAspectRatio: 1.8,
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         user: nextProps.user || {},
         userLogin: nextProps.user.userLogin,
         params: nextProps.navigation.state.params,
         Beginner: nextProps.navigation.state.params["Beginner"],
         Intermediate: nextProps.navigation.state.params["Intermediate"],
         Advanced: nextProps.navigation.state.params["Advanced"],
         Levels: nextProps.navigation.state.params["Levels"],
      })
   }

   componentDidMount() {
      Dimensions.addEventListener('change', this._handleChange);
   }

   componentWillUnmount() {
      Dimensions.addEventListener('change', this._handleChange);
   }

   _handleChange = (change) => {
      this.setState({ width: change.window.width, height: change.window.height, TopCardAspectRatio: (change.window.width > change.window.height ? 2 : 1.8) });
   }

   check = (val, zero) => {
      (this.state.userLogin) ? this.props.onViewAll(val, zero) : this.props.openLogin();
   }

   _renderCustomSegmentElementChild(val) {
      if (this.state.Levels[val].status) {
         if (this.state.Levels[val].hideCourse != 1) {
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
                        <TouchableOpacity onPress={debounce(() => this.check(this.state.Levels[val].levelId, this.state.Levels[val]), 1000, { leading: true, trailing: false })}>
                           <Image
                              style={{
                                 width: this.state.width * 30.1 / 90, aspectRatio: 1.1,
                                 paddingTop: 15,
                                 borderRadius: 6,
                                 borderColor: 'grey',
                              }}
                              source={{ uri: this.state.Levels[val].levelThumbNoPlayIcon }}
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
                              <StyledText weight={"SemiBold"}>
                                 {this.state.Levels[val].LevelTitleNew}
                              </StyledText>
                              <StyledText size={"Medium"}>
                                 {this.state.Levels[val].LevelDescNew}
                              </StyledText>
                           </View>
                           <View
                              style={{
                                 flexDirection: 'row',
                                 backgroundColor: '#6b38a5',
                                 borderRadius: 4,
                              }}>
                              <TouchableOpacity onPress={debounce(() => this.check(this.state.Levels[val].levelId, this.state.Levels[val]), 1000, { leading: true, trailing: false })}
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
                                    View full course</Text>
                                 <Icon size={18} name="md-arrow-forward" color='#ffffff' />
                              </TouchableOpacity>
                           </View>
                        </View>
                     </View>
                  </View>
               </View>
            );
         }

      } else {
         return (
            <View>
               {/* <View style={{ flex: 1, alignContent: "center", paddingVertical: 5, flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
                  <Image
                     style={{ width: this.state.width * 30.1 / 90, height: this.state.height * 25 / 139, paddingTop: 15, borderRadius: 2, borderColor: 'grey', paddingHorizontal: 10, }}
                     source={{ uri: this.state.Levels[val].levelThumbnail }}
                  />
               </View> */}
            </View>
         )
      }
   }

   render() {
      const backAction = NavigationActions.back({
         routeName: 'HomeScreen',
      });
      keys = Object.keys(this.state.Levels)
      buttonsListArr = [];
      levelsArray = Object.values(this.state.Levels)
      const tempKeyArray = new Array()
      tempPriority = 0
      for (let i = 0; i < levelsArray.length; i++) {
         for (let i = 0; i < levelsArray.length; i++) {
            if (tempPriority == levelsArray[i].priority) {
               for (let j = 0; j < keys.length; j++) {
                  if (i == j) {
                     tempKeyArray.push(keys[j])
                  }
               }
               tempPriority = tempPriority + 1
            }
         }
      }
      const HideArray = new Array()
      const notHideArray = new Array()
      for (let i = 0; i < levelsArray.length; i++) {
         if (levelsArray[i].status) {
            if (levelsArray[i].hideCourse == 1) {
               HideArray.push(levelsArray[i])
            } else {
               notHideArray.push(levelsArray[i])
            }
         }
      }

      notHideComponent = [];
      if (notHideArray.length == 0) {
         notHideComponent.push(
            <View style={{ height: '100%', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
               <Text style={{ textAlign: 'center', color: 'grey', fontFamily: "Nunito-Regular", }}>No modules available at this time. Please choose another course.</Text>
            </View>
         )
      }
      for (let i = 0; i < tempKeyArray.length; i++) {
         buttonsListArr.push(
            <View>
               {this._renderCustomSegmentElementChild(tempKeyArray[i])}
            </View>
         )
      }

      return (
         <StyledContainer>
            <Header title={this.props.navigation.state.params.courseName} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())} />
            <StyledBox contentContainerStyle={{ alignItems: "center" }}>
               <StyledContainer>
               </StyledContainer>
               <StyledImageContainer>
                  <View style={{ backgroundColor: "#fefefe" }}>
                     {buttonsListArr}
                  </View>
               </StyledImageContainer>
            </StyledBox>
            <View>{notHideComponent}</View>
         </StyledContainer>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   openVideo: (params) => {
      dispatch({ type: 'OPEN_VIDEO', params })
   },
   onViewAll: (val, zero) => {
      console.log('------', val, zero);
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
   openLogin: (params) => {
      //console.log("!!this ran");
      dispatch({ type: 'OPEN_LOGIN', params })
   },
});

export default CourseScreen = connect(mapStateToProps, mapDispatchToProps)(CScreen);