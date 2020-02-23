import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Share,
    TouchableHighlight,
    Modal,
    ScrollView,
    BackAndroid,
    Alert,
    Dimensions,
    Image,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { StyledText, AlignedText, StyledHeader } from '../UI';
// import { StyledText, StyledHeader } from '../UI';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager
} = FBSDK;

export class SideMenu extends Component {
    constructor(props) {
        super(props);
        let height = Dimensions.get("window").height;
        this.state = {
        }
    }

    componentWillMount() {

    };

    componentWillUnmount() {

    };

    onLogout = () => {

        // LoginManager.logOut();

        firebase.auth().signOut()
            .then(() => {
                // this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginModal' }));
                this.props.onNavTo('LoginModal')
                ToastAndroid.show(`Logged out!`, ToastAndroid.LONG);

            }).catch((error) => {
                console.log(error);
                ToastAndroid.show("error", ToastAndroid.LONG);
            })
    }

    onNavigate = (data) => {
        console.log("this.props onNavigate",this.props);
        if (data != "") {
            if (this.props.user.userLogin) {
               
                this.props.onNav(data,this.props.user.user.uid);
            } else {
                this.props.onNavTo('LoginModal')
            }
        } else {
            ToastAndroid.show(`Page under construction`, ToastAndroid.LONG);
        }

    }
    onNavToHome = (data) => {
        if (data != "") {
            if (this.props.user.userLogin) {
                this.props.onNavTo(data);
            } else {
                this.props.onNavTo('LoginModal')
            }
        } else {
            ToastAndroid.show(`Page under construction`, ToastAndroid.LONG);
        }

    }
    onClick = () => {
        Share.share({
            message: `Amazing video courses for Carnatic music, Voice Culture, Film Music & Tiny Tots! Learn Indian music from the comfort of home. Download VoxGuru for free! https://play.google.com/store/apps/details?id=com.voxguru`,
            url: 'http://www.pratibhamusic.com/',
            title: 'Wow, did you see that?'
        }, {
                // Android only:
                dialogTitle: 'Share the VoxGuru goodness!',
                // iOS only:
                excludedActivityTypes: [
                ]
            })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.onNavToHome('HomeScreen')}
                    style={{ flex: 1, height: "25%", backgroundColor: "#ffbb00" }}
                >
                    <View style={{ flex: -1, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', padding: 5 }}>
                        <View style={{ flex: -1, justifyContent: "flex-start", alignItems: "center", flexDirection: 'row', paddingLeft: 17.5, }}>
                            <Icon name="home" color='#fefefe' size={24}
                            />
                            <StyledText
                                style={{ color: "#fefefe", paddingLeft: 10 }}
                            >Home</StyledText>

                        </View>
                        <Image
                            style={{ maxHeight: 47, maxWidth: 73, resizeMode: 'contain', marginLeft: 80 }}
                            source={require('../images/logo1.png')} />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.onNavigate('Subscribe')}
                    style={{
                        backgroundColor: '#6b38a5',
                        borderRadius: 4,
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                    }}>
                    <View style={{ flex: -1, justifyContent: 'flex-start', alignItems: "center", flexDirection: 'row' }}>
                        <Icon name="subscriptions" color='#ffffff' size={24}
                        />
                        <AlignedText color={'Light'} padding={'0px 10px'} weight={'Bold'}>My Courses</AlignedText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onNavigate('BookLiveClass')}
                    style={{
                        backgroundColor: '#6b38a5',
                        borderRadius: 4,
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                    }}>
                    <View style={{ flex: -1, alignItems: "center", justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Icon name="videocam" color='#ffffff' size={24}
                        />
                        <AlignedText color={'Light'} padding={'0px 10px'} weight={'Bold'}>Book Live Class</AlignedText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onNavigate('MyAccount')}
                    style={{
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                    }}>

                    <AlignedText>My Account </AlignedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.onNav('AboutUsScreen')}
                    style={{
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                    }}>
                    <AlignedText>About Us </AlignedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onNav('PrivacyPolicy')}
                    style={{
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                    }}>

                    <AlignedText>Privacy Policy</AlignedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onNav('HelpCenter')}
                    style={{
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                    }}>
                    <AlignedText>Help Center </AlignedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClick()}
                    style={{
                        minHeight: 30,
                        marginTop: 10,
                        marginHorizontal: 5,
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                    }}>

                    <AlignedText>Spread the love </AlignedText>

                    <Icons name="facebook" size={20} style={{ paddingRight: 10 }}
                    />
                    <Icons name="twitter" size={20} style={{ paddingRight: 10 }}
                    />
                    <Icons name="whatsapp" size={20} style={{ paddingRight: 10 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onLogout()} style={{
                    minHeight: 30,
                    marginTop: 10,
                    marginHorizontal: 5,
                    alignItems: "flex-start",
                    paddingVertical: 5,
                    paddingHorizontal: 20, flexDirection: "row", flexWrap: "nowrap"
                }}>
                    <AlignedText>Log Out</AlignedText>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

mapStateToProps = state => ({
    user: state.user
});

mapDispatchToProps = dispatch => ({

    onNav: (routeName,userId) => {
        console.log('----id',userId)
        if(routeName == 'BookLiveClass'){
            dispatch(NavigationActions.navigate({ routeName : routeName ,params:{id:userId}}));
        } else {
            dispatch(NavigationActions.navigate({ routeName }));
        }
       
    },

    openLogin: () => {
        dispatch({ type: 'OPEN_LOGIN' });
    },

    onNavTo: (routeName) => {
        dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: routeName })],
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);






// keytool -exportcert -list -v -alias <your-key-name> -keystore <path-to-production-keystore>