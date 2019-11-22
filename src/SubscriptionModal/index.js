'use strict'

// React
import React from 'react'
import { Modal, View, Alert, StatuÃsBar, ActivityIndicator, ToastAndroid, TouchableOpacity } from 'react-native'

import {
    StyledContainer,
    AlignedText,
} from '../UI';
import firebase from 'react-native-firebase';
import Header from '../Component/Header';
import RadioButton from '../Component/RadioButton';
import UserInfo from '../Component/UserInfo';
import { NavigationActions } from 'react-navigation';
import branch from 'react-native-branch'
import WebPage from '../Component/WebPage';
//Redux
import { connect } from 'react-redux';

import debounce from 'lodash.debounce'

// payment processor

import { newOrder } from '../payU';
const uuid = require('react-native-uuid');


const mapStateToProps = (state) => {
    return {
        modalVisible: state.subscription.modalVisible,
        params: state.subscription.params,
        user: state.user,
        isFail: state.subscription.isFail,
        isSuccess: state.subscription.isSuccess,
        data: state.subscription.data,
        lessonDetails: state.subscription.lessonDetails,
        lesnId: state.subscription.lesnId,
    }
}

class SubscriptionModalNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.modalVisible,
            params: this.props.params,
            executed: null,
            planSelected: null,
            userInfoConfirm: null,
            url: null,
            data: null,
            isSuccess: false,
            isFail: false,
            showWebpage: false,
        };

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log("modal unmounted");
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps.modalVisible !== this.props.modalVisible) {
            if (nextProps.modalVisible) {
                this.setState({ modalVisible: true })
            } else {
                this.setState({ modalVisible: false })
            }
        }
        if (nextProps.params !== this.props.params) {
            if (nextProps.params) {
                this.setState({ params: nextProps.params })
            }
        }
        if (nextProps.isFail !== this.props.isFail) {
            this.setState({ isFail: nextProps.isFail })
        }
        if (nextProps.isSuccess !== this.props.isSuccess) {
            this.setState({ isSuccess: nextProps.isSuccess })
        }

    }

    openModal = () => {
        return { type: 'OPEN_PAY', payload: null }
    }

    closeModal = () => {
        // console.log("close");
        this.setState({
            modalVisible: false,
            params: null,
            executed: null,
            planSelected: null,
            userInfoConfirm: null,
            url: null,
            data: null,
            isSuccess: false,
            isFail: false,
            showWebpage: false,
        }, () => {
            this.props.dispatch({ type: 'CLOSE_PAY' })
        });
    }

    closeSuccess = () => {
        var self = this;
        console.log(this.props);
        let { params } = this.props;
        firebase.database().ref().child('lessons').child(this.props.lesnId).once('value')
            .then(function (snapshot) {
                if (snapshot.val()) {
                    let dataSource = snapshot.val() || {};
                    // console.log(snapshot.val());
                    // let resetAction = NavigationActions.reset({
                    //     index: 1,
                    //     actions: [
                    //         NavigationActions.navigate({ routeName: 'HomeScreen' }),
                    //         // NavigationActions.navigate({ routeName: 'HomeScreen', params: dataSource, })
                    //     ],
                    // });
                    // self.props.dispatch(resetAction);
                    self.closeModal();
                } else {
                    console.log("error");
                }
            });
    }

    onLearnMore = () => {
        Alert.alert(
            'Are you sure?',
            'Do you want to exit the payment process?',
            [
                { text: 'Cancel', onPress: () => console.log("this is working"), style: 'cancel' },
                { text: 'OK', onPress: () => this.closeModal() },
            ],
            { cancelable: false }
        )

    }

    sendCommerceEvent = async (TRANSACTION_ID, CURRENCY, VALUE, ) => {
        try {
            let result = await branch.sendCommerceEvent(VALUE, { TRANSACTION_ID, CURRENCY, })

            console.log('sendCommerceEvent', result)
            this.addResult('success', 'sendCommerceEvent', result)
        } catch (err) {
            console.log('sendCommerceEvent err', err.toString())
            this.addResult('error', 'sendCommerceEvent', err.toString())
        }
    }


    processPayment = (data) => {
        if (this.state.executed === null) {
            let startDate = new Date().getTime();
            let value = this.props.params.cost.value[this.state.planSelected.value];
            let endDate = value + startDate;
            let key = this.props.params.info.currentLevelId;
            let lesnId = this.props.params.info.currentLessonId;
            let update = {};
            if (this.props.user.user.LessonStatus) {
                console.log(this.props.user.user.LessonStatus);
                if (key in this.props.user.user.LessonStatus) {
                    let newEndDate
                    if (this.props.user.user.LessonStatus[key].endDate - startDate > 0) {
                        newEndDate = this.props.user.user.LessonStatus[key].endDate + value;
                        lesnId = this.props.user.user.LessonStatus[key].currentLessonId;
                    } else {
                        newEndDate = endDate;
                    }
                    update = { ...this.props.user.user.LessonStatus[key], endDate: newEndDate };
                } else {
                    update = { ...this.props.params.info, endDate, startDate }
                }
            } else {
                update = { ...this.props.params.info, endDate, startDate }
            }
            let object = this.props.user.user.LessonStatus || {};
            let transition = {};
            transition[this.state.data.txnid] = { ...this.state.data, uid: this.props.user.uid, createDate: new Date() };
            var params = { LessonStatus: object, TransactionHistory: transition };
            let myRe = new RegExp('[INR]');
            let myArray = myRe.exec(this.state.planSelected.label);
            var CURRENCY = "USD";
            if (myArray) {
                CURRENCY = "INR";
            }
            console.log(CURRENCY);

        //
            // Currency Conversion - Start
            let planValueAfter = null;
            if(CURRENCY === null) {
                if(planValueAfter <= 100) {
                    CURRENCY = "USD";
                } else {
                    CURRENCY = "INR";
                }
            }
            // Conversion
            if(CURRENCY === "USD") {
                let dataAfter = this.props.params.cost.value;
                let arrayAfter = Object.values( dataAfter );
                let arrayPointerAfter = null;

                for(let i = 0; i < 3; i++) {
                    arrayAfter.shift();
                }
                for(let j = 0; j < arrayAfter.length; j++) {
                    if(arrayAfter[j] === this.props.params.cost.value[this.state.planSelected.value]) {
                        arrayPointerAfter = j;
                    }
                }
                let planValueAfterPointer = parseInt(this.props.params.cost.Indian[arrayPointerAfter].value, 10);
                let currencyValueAfterPointer = parseInt(this.props.params.cost.margin[arrayPointerAfter].value, 10);
                planValueAfter = planValueAfterPointer + currencyValueAfterPointer;
            } else {
                planValueAfter = parseInt(this.state.planSelected.value, 10);
            }
            console.log("Plan Value After: ", planValueAfter);
            // Currency Conversion - End
        //
            // Original Firebase Ecommerce_Purchase
            firebase.analytics().logEvent(`ECOMMERCE_PURCHASE`, {
                TRANSACTION_ID: transition.txnid,
                CURRENCY: CURRENCY,
                VALUE: planValueAfter,
            });

            // Firebase Ecommerce_Purchase
            firebase.analytics().logEvent("ecommerce_purchase", {
                transaction_id: transition.txnid,
                currency: CURRENCY,
                value: planValueAfter,
            });

            console.log("Transaction ID", transition.txnid);
            console.log("Currency", CURRENCY);
            console.log("Value", this.state.planSelected.value);

            this.sendCommerceEvent(transition.txnid, CURRENCY, this.state.planSelected.value)

            params.LessonStatus[key] = update;
            this.setState({ executed: false, showWebpage: false });
            console.log("success:", data);
            this.writeToDB({ params, lessonDetails: this.props.params.info, isSuccess: true, lesnId });


            this.writeToRealtimeDatabase(params, update, CURRENCY)

            if (this.state.isSuccess) {
                this.setState({ showWebpage: false })
                this.closeSuccess()
            }
        }
    }
    writeToRealtimeDatabase(params, purchasedLesson, CURRENCY) {
        var self = this
        firebase.firestore().collection("users").doc(self.props.user.user.uid).get().then(function (doc) {
            if (doc.exists) {
                var info = doc.data();
                console.log('---info', info)
                let temp = {};
                temp["info"] = {
                    email: info.email,
                    userName: info.userName,
                    profileThumbnail: info.profileThumbnail,
                    mobile_number: info.mobile_number,
                    genderText: info.genderText,
                    ageText: info.ageText,
                    first_name: info.first_name,
                    last_name: info.last_name,
                    country: info.country,
                    udid: info.udid,
                    os: info.os,
                    subscription_status: true,
                    date_of_registration: info.date_of_registration,
                }
                self.props.dispatch({ type: 'USER_FIRESTORE_CREATE', params: temp });
            }
        })
        let transHistoryArray = Object.values(params.TransactionHistory)
        var sId = firebase.database().ref().push().key
        console.log("subscription_id---", sId);
        firebase.database().ref('/user_subscription').child(sId).set({
            subscription_id: sId,
            email: self.props.user.user.email,
            product_id: purchasedLesson.currentLevelId,
            purchase_date_pst: purchasedLesson.startDate,
            is_trial_period: false,
            subscription_type: 'Fresh',
            subscription_start_date_time: purchasedLesson.startDate,
            subscription_end_date_time: purchasedLesson.endDate,
            course_fee_amount_paid: transHistoryArray[0].amount
        });

        // Subscription Test - Start
        // firebase.database().ref('/user_subscription').child(sId).set({
        //     subscription_id: sId,
        //     email: self.props.user.user.email,
        //     product_id: purchasedLesson.currentLevelId,
        //     purchase_date_pst: purchasedLesson.startDate,
        //     is_trial_period: false,
        //     subscription_type: 'Test',
        //     subscription_start_date_time: purchasedLesson.startDate,
        //     subscription_end_date_time: purchasedLesson.endDate,
        //     course_fee_amount_paid: transHistoryArray[0].amount
        // });
        // Subscription Test - End

        var stId = firebase.database().ref().push().key
        firebase.database().ref('/user_subscription_transactions').child(stId).set({
            subscription_transaction_id: stId,
            subscription_id: sId,
            email: transHistoryArray[0].email,
            transaction_reference_id: transHistoryArray[0].txnid,
            transaction_date: purchasedLesson.startDate,
            transaction_status: 'success',
            amount: transHistoryArray[0].amount,
            currency: CURRENCY,
        });
    }

    onNavigationStateChange = (data) => {
        if (this.state.showWebpage) {
            // Code for creating payment
            // this.processPayment(data);
            // remove tho comment the above code      

            if (data.url === "https://www.google.com/_failure") {
                // do something on faliure

                // Show failure modal and as for retry or exit

                if (this.state.executed === null) {
                    //   this.setState({executed: false, data: {...this.state.data,failure: true}}, this._failure);
                    this.setState({ executed: false, showWebpage: false });
                    console.log("faliure:", data);
                    this.props.dispatch({
                        type: "USER_PAYMENT_FAIL", params,
                        transactions: this.state.data, isFail: true
                    });
                }
            }

            if (data.url === "https://www.google.com/_success") {
                // if (this.state.executed === null) {

                this.processPayment(data);

                // }
            }

        }
    }

    planSubmit = (params) => {

        console.log(params);
        this.setState({ planSelected: params });
    };

    userInfoSubmit = (params) => {
        console.log(params);
        this.setState({ userInfoConfirm: true });
        // processing payment

        // for live account payU
        newOrder.Create({
            amount: this.state.planSelected.value,
            productinfo: this.state.params.info.currentLevelName,
            firstname: params.name,
            email: params.email,
            phone: params.phone,
            surl: 'https://www.google.com/_success',
            furl: 'https://www.google.com/_failure',
            service_provider: 'payuBiz',
            txnid: uuid.v4(),
            key: this.props.user.userIN ? "7dr1rA" : "fDBTdB",
            salt: this.props.user.userIN ? "vLEDVf0x" : "FKU2QUeq",
        }, true);

        //for test account payU
        // newOrder.Create({
        //     amount: this.state.planSelected.value,
        //     productinfo: this.state.params.info.currentLevelName,
        //     firstname: params.name,
        //     email: params.email,
        //     phone: params.phone,
        //     surl: 'https://www.google.com/_success',
        //     furl: 'https://www.google.com/_failure',
        //     service_provider: 'payuBiz',
        //     txnid: uuid.v4(),
        // }, false);

        newOrder.sendReq()
            .then(Response => {
                console.log(Response);
                this.setState({
                    isLoading: false,
                    url: Response.url,
                    data: { ...Response.data }
                })
                if (Response.url != "https://secure.payu.in/_payment") {
                    ToastAndroid.show('Payment Request Success!!', ToastAndroid.SHORT);
                    // showWebpage
                    this.setState({ showWebpage: true, });
                } else {
                    ToastAndroid.show('Payment Request Failed!!', ToastAndroid.SHORT);
                    this.setState({ userInfoConfirm: false });
                    this.closeModal();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    writeToDB = ({ params, lessonDetails, isSuccess, lesnId }) => {
        var self = this;
        let batch = firebase.firestore().batch();
        let lessons = firebase.firestore().collection(`users/${self.props.user.user.uid}/LessonStatus`)
        let userTran = firebase.firestore().collection(`users/${self.props.user.user.uid}/TransactionHistory`)
        let globalTran = firebase.firestore().collection(`transaction`);
        let levelId, price;

        for (var key in params.LessonStatus) {
            var lessonRef = lessons.doc(key);
            batch.set(lessonRef, params.LessonStatus[key]);
            levelId = params.LessonStatus[key].currentLevelId;
        }

        for (var key in params.TransactionHistory) {
            var userTranRef = userTran.doc(key);
            batch.set(userTranRef, params.TransactionHistory[key]);
            price = Number(params.TransactionHistory[key].amount);
        }

        for (var key in params.TransactionHistory) {
            var globalTranRef = globalTran.doc(params.TransactionHistory[key].txnid);
            batch.set(globalTranRef, params.TransactionHistory[key]);
        }

        batch.commit().then(function () {
            // console.log("batch wrote successfully");
            ToastAndroid.show(`Completed Course buy`, ToastAndroid.LONG)
            self.props.dispatch({ type: "USER_COURSE_BUY", params, lessonDetails, isSuccess, lesnId });
            self.props.dispatch({ type: "USER_UPDATE", params });

        })
    }
    render() {



        return (
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.onLearnMore()}>
                <StyledContainer>
                    <Header title={this.state.showWebpage ? "Payment Gateway" : !this.state.userInfoConfirm && this.state.planSelected ? "Confirm Details" : "Payment"} leftNavMenu={false} leftNavFunc={this.onLearnMore} />

                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>

                        {!this.state.planSelected
                            && <RadioButton params={this.state.params} planSubmit={this.planSubmit} />}

                        {(!this.state.userInfoConfirm && this.state.planSelected)
                            && <UserInfo params={this.state.params} userInfoSubmit={this.userInfoSubmit}
                                planSelected={this.state.planSelected} />}

                        <View style={{
                            marginVertical: (!this.state.showWebpage && this.state.userInfoConfirm && !this.state.isSuccess
                                && !this.setState.isFail) ? 100 : 0
                        }}>
                            <ActivityIndicator animating={!this.state.showWebpage && this.state.userInfoConfirm
                                && !this.state.isSuccess && !this.setState.isFail} size={'large'} color={'purple'} />

                            {(!this.state.showWebpage && this.state.userInfoConfirm && !this.state.isSuccess
                                && !this.setState.isFail)
                                && <AlignedText color={'Special'} textalign={'Center'}
                                    selfalign={'Center'}> ...Loading Payment Gateway </AlignedText>}
                        </View>

                        {this.state.showWebpage
                            && (<WebPage link={this.state.url}
                                onNavigationStateChange={this.onNavigationStateChange} />)}

                        {(this.state.isSuccess)
                            && (
                                this.closeSuccess()
                            )
                            // <StyledImageCard>
                            //     <AlignedText> Payment Success!! </AlignedText>
                            //     <AlignedText>{this.state.data.txnid}</AlignedText>
                            //     <SmallButton onPress={debounce(() => this.closeSuccess(), 1000, { leading: true, trailing: false })}>
                            //         <AlignedText color={"Light"} weight={"SemiBold"} padding={"2.5px 5px"}>Start Course</AlignedText>
                            //     </SmallButton>
                            // </StyledImageCard>
                        }

                    </View>
                </StyledContainer>
            </Modal>
        )
    }
}

// const mapDispatchToProps = dispatch => ({
//     onLessonUpdate: (object, key, update) =>{

//     }
// });

export const SubscriptionModal = connect(mapStateToProps)(SubscriptionModalNavigation);

// Todo: user info forum.
// Todo: call payu and get url.
// Todo: url correct then transition to webpage.
// Todo: on success, show success pop up and update redux store and firestore.
// Todo: on failure, show faliure pop up.

export const subscriptionReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_PAY':
            return { ...state, params: action.params, modalVisible: true }
            break;
        case 'CLOSE_PAY':
            return { modalVisible: false, params: null }
            break;
        case 'USER_COURSE_BUY':
            return { ...state, params: action.params, isSuccess: action.isSuccess, lessonDetails: action.lessonDetails, lesnId: action.lesnId }
            break;
        case 'USER_UPDATE':
            return { ...state }
            break;
        case 'USER_PAYMENT_FAIL':
            return { ...state, data: action.transactions, params: action.params, isFail: action.isFail }
            break;
        default:
            return { modalVisible: false };
    }
}