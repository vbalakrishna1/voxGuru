import React from 'react';
import { NavigationActions } from 'react-navigation';
import {Dimensions, Image, View, Text, TouchableOpacity, ToastAndroid, Platform} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';
import {StyledText, StyledContainer, StyledBox, StyledImageContainer, StyledVideoBar, AlignedText} from '../UI';
import TopCard from '../Component/TopCard';
import firebase from 'react-native-firebase';
import debounce from 'lodash.debounce'

class CScreen extends React.Component {

  constructor(props) {
    super(props);
    const {width, height} = Dimensions.get('window');
    this.state = {
      user:props.user || {},
      userLogin: props.user.userLogin,
      params: props.navigation.state.params,
      selectedCustomSegment: 0,
      width,height,
      Beginner: props.navigation.state.params["Beginner"],
      Intermediate: props.navigation.state.params["Intermediate"],
      Advanced: props.navigation.state.params["Advanced"],
      TopCardAspectRatio:1.8,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState ({
      user:nextProps.user || {},
      userLogin: nextProps.user.userLogin,
      params: nextProps.navigation.state.params,
      Beginner: nextProps.navigation.state.params["Beginner"],
      Intermediate: nextProps.navigation.state.params["Intermediate"],
      Advanced: nextProps.navigation.state.params["Advanced"],
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
        this.setState({width:change.window.width,height:change.window.height, TopCardAspectRatio: (change.window.width>change.window.height ? 2: 1.8)});
  }

  check = (val, zero) => {
    //console.log("this checking Values"+ val);
    //console.log("this checking zeroes"+ zero);
    //console.log("this checking state"+this.state);
    (this.state.userLogin) ? this.props.onViewAll(val, zero) : this.props.openLogin();
  }

  _renderCustomSegmentElementChild(val) {
    // console.log(this.state[val]);
    if(this.state[val].status) {
      return (
      <View>
      <View  style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        paddingHorizontal:10,
        paddingVertical:5
      }}>
      <View style={{
        flexWrap: 'nowrap',
        flexDirection: 'row',
        padding: 10,
        elevation: 4,
        margin:5,
      }}>
      <TouchableOpacity  onPress={
        (this.state.userLogin) ? debounce(()=>this.props.openVideo(this.state[val].videoId), 1000, {leading:true, trailing:false})  : debounce(()=>this.props.openLogin(), 1000, {leading:true, trailing:false})
      }>
      <Image 
      style={{
        width: this.state.width* 30.1/90, aspectRatio:1.1,
        paddingTop: 15,
        borderRadius: 2,
        borderColor: 'grey',
      }}
      source={{uri:this.state[val].levelThumbnail}}
      />
      </TouchableOpacity>
      <View style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 5,
        justifyContent:"space-between",
      }}>
      <View style={{paddingLeft:2.5}}>
      <StyledText weight={"SemiBold"}>    
        {this.state[val].levelTitle} 
      </StyledText>
      <StyledText>
        {this.state[val].levelDesc} 
      </StyledText>
      </View>
      <View
      style={{
          flexDirection: 'row',
          backgroundColor: '#6b38a5',
          borderRadius: 4,
        }}>
        <TouchableOpacity  onPress={ debounce(()=>this.check(this.state[val].levelId, this.state[val]), 1000, {leading:true, trailing:false})}
        // this.onViewAll(this.state[val].levelId,this.state[val])
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "space-between",
          paddingVertical: 10,
        }}> 
        <Text style={{color:'#ffbc00'}} >
        View full course
        </Text>
        <Icon size={18} name="md-arrow-forward" color='#ffbc00' />
        </TouchableOpacity>
        </View>
      </View>
      </View>
      </View>
      </View>
      );

      } {
      return (
      <View>
      <View  style={{
        flex: 1,
        alignContent: "center",
        paddingVertical: 5,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems:"center",
      }}>
                <Image 
      style={{
        width: this.state.width* 30.1/90, height: this.state.height* 25/139,
        paddingTop: 15,
        borderRadius: 2,
        borderColor: 'grey',
        paddingHorizontal: 10,
      }}
      source={{uri:this.state[val].levelThumbnail}}
      />
      </View>
      </View>
      )
    }
}

  _renderCustomSegmentElement = () => {
    switch(this.state.selectedCustomSegment) { 
    case 0:
          var val = 'Beginner';

          return this._renderCustomSegmentElementChild(val);
    case 1:
          var val = 'Intermediate';

          return this._renderCustomSegmentElementChild(val);
    case 2:
        var val = 'Advanced';

        return this._renderCustomSegmentElementChild(val);
    default:
        var val = 'Beginner';
        // console.log(this.state.Beginner)
        return this._renderCustomSegmentElementChild(val);
    }

  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedCustomSegment: index,
    });
  }

  _renderCustomSegmentControlClone = () =>{

    function setSelectedOption(option){
      this.setState({
        selectedCustomSegment: option,
      });
    }

    return (
      <View style={{backgroundColor: "#fefefe"}}>
        <SegmentedControlTab
          values={['Beginner', 'Intermediate']}
          selectedIndex={this.state.selectedCustomSegment}
          onTabPress={this.handleIndexChange}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2', borderWidth: 0 }}
          tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0}}
          activeTabStyle={{ backgroundColor: '#6b38a5', marginTop: 2 , borderColor: '#444444' , borderWidth: 1}}
          tabTextStyle={{ color: '#333333', fontSize: 16, fontFamily: (Platform.OS) === 'ios' ? 'Nunito-Regular' : 'Nunito-Regular',}}
          activeTabTextStyle={{ color: '#ffbc00' , fontSize: 16, fontFamily: "Nunito-SemiBold"}} 
        />
        {this._renderCustomSegmentElement()}
      </View>);
  }

  render() {
    const backAction = NavigationActions.back({
      routeName: 'HomeScreen',
    });

    return (
      <StyledContainer>
      <Header title={this.props.navigation.state.params.courseName} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())}/>
      <StyledBox contentContainerStyle={{alignItems:"center"}}>
        <StyledImageContainer>
        <TopCard img = {this.state.params} openVideo={this.props.openVideo} 
        TopCardAspectRatio={this.state.TopCardAspectRatio} width={this.state.width}
        />
        <StyledVideoBar>
        <StyledText color={"Light"} weight={"SemiBold"}>{this.state.params.courseTitile}</StyledText>
        <StyledText color={"Light"} weight={"SemiBold"}>{this.state.params.courseVideoLength}</StyledText>        
        </StyledVideoBar>
        </StyledImageContainer>
        <AlignedText size={"Medium"} textalign={"Justify"} padding={"5px"} >{this.state.params.courseDesciption}</AlignedText>
        <StyledContainer>
      </StyledContainer>
      <StyledImageContainer>
        {this._renderCustomSegmentControlClone()}          
      </StyledImageContainer>
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
    dispatch({type:'OPEN_VIDEO', params})
  },
  onViewAll: (val, zero) =>{
    //console.log(val);
    //console.log(zero);
    firebase.database().ref().child('levels').child(val).once('value')
    .then(function(snapshot){
      if(snapshot.val()){
        let dataSource = snapshot.val() || {};
        //console.log(dataSource , zero);
        dispatch(NavigationActions.navigate({routeName: 'WeekViewScreen', params:{...dataSource, zero} }));
      } else {
        Alert.alert(
          'Error..! Server did not respond',
          'Try again',
          [
            {text: 'OK', onPress: () => console.log("Error"), style: 'cancel'},
          ],
          { cancelable: true }
        )
      }
    }).catch((error) =>{
      //console.log(error);
    });
  },
  openLogin: (params) => {
    //console.log("!!this ran");
    dispatch({type:'OPEN_LOGIN', params})
  } ,
});

export default CourseScreen =  connect(mapStateToProps, mapDispatchToProps)(CScreen);