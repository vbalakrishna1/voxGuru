import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';
import ChatBot from 'react-native-chatbot';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {StyledHighLight,StyledText, StyledContainer, StyledBox} from '../UI';
import Header from '../Component/Header';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      phone: '',
      email: '',
      country: '',
      course: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age, phone, email, country, course } = steps;

    this.setState({ name, gender, age, phone , email, country, course});
  }

  render() {
    const { name, gender, age, phone, email, country, course } = this.state;
    return (
     <StyledText> Summary: Name  <StyledHighLight> {name.value}  </StyledHighLight> Gender  <StyledHighLight> {gender.value}  </StyledHighLight> 
        Age  <StyledHighLight> {age.value} </StyledHighLight>  Phone  <StyledHighLight> {phone.value} </StyledHighLight>
       Email  <StyledHighLight> {email.value} </StyledHighLight> Country  <StyledHighLight> {country.value} </StyledHighLight>
       Course Style  <StyledHighLight> {course.value} </StyledHighLight></StyledText>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class BookLiveScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      phone: '',
      email: '',
      country: '',
      course: '',
    };
  }
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    console.log(steps);
    console.log(values.length);
    // alert(`Chat handleEnd callback! Number: ${values[0]}`);
    // firebase.firestore().collection().add(steps).then(function(DocumentReference) {
    //   console.log(DocumentReference);
    // });
    if(values.length >= 2){
      firebase.firestore().collection("liveClassRequest").add({
        name: steps.name.value,
        gender: steps.gender.value,
        age: steps.age.value,
        phone: steps.phone.value,
        email: steps.email.value,
        country: steps.country.value,
        course: steps.course.value,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    } else{
      console.log("Todo: event");
    }

  }

  render() {
    return (
    <StyledContainer>
    <Header title={"Book Live Class"} leftNavMenu={true} leftNavFunc={() => this.props.navigation.navigate("DrawerOpen")}/>
         <StyledBox>
       <ChatBot
      handleEnd={this.handleEnd}
        steps={[
          {
            id: '1',
            message: 'Hi there! Would you like to book a live class ?',
            trigger: 'question',
          },
          {
            id: 'question',
            options: [
              { value: 'yes', label: 'Yes', trigger: '2' },
              { value: 'no', label: 'No', trigger: 'end' },
            ],
          },
          {
            id: '2',
            message: 'Great! What’s your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is the student’s age?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '5',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '5',
            message: 'And gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '6' },
              { value: 'female', label: 'Female', trigger: '6' },
            ],
          },
          {
            id: '6',
            message: 'What’s your email address?',
            trigger: 'email',
          },
          {
            id: 'email',
            user: true,
            trigger: '8',
          },
          {
            id: '8',
            message: 'And your phone number please?',
            trigger: 'phone',
          },
          {
            id: 'phone',
            user: true,
            trigger: '9',
          },
          {
            id: '9',
            message: 'Which country are you from?',
            trigger: 'country',
          },
          {
            id: 'country',
            user: true,
            trigger: '10',
          },
          {
            id: '10',
            message: 'What style of music would you like to learn?',
            trigger: 'course',
          },
          {
            id: 'course',
            options: [
              { value: 'carnatic', label: 'Carnatic', trigger: '7' },
              { value: 'hindustani', label: 'Hindustani', trigger: '7' },
              { value: 'lightvocal', label: 'Light Vocal', trigger: '7' },
              { value: 'western', label: 'Western', trigger: '7' },    
              { value: 'tinytots', label: 'Tiny Tots', trigger: '7' },              
                        
            ],
          },
          {
            id: '7',
            message: 'Great! Take a quick look at your responses before submitting!',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review/>,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to make any changes?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What would you like to change?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
              { value: 'email', label: 'Email', trigger: 'update-email' },
              { value: 'phone', label: 'Phone', trigger: 'update-phone' },
              { value: 'country', label: 'Country', trigger: 'update-country' },
              { value: 'course', label: 'Course', trigger: 'update-course' },              
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'update-email',
            update: 'email',
            trigger: '7',
          },
          {
            id: 'update-phone',
            update: 'phone',
            trigger: '7',
          },
          {
            id: 'update-country',
            update: 'country',
            trigger: '7',
          },
          {
            id: 'update-course',
            update: 'course',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your application has been submitted and our team will contact you shortly!',
            end: true,
          },
          {
            id: 'end',
            message: 'No worries! Do come back when you’re ready!',
            end: true,
          },
        ]}
      />
      </StyledBox>
    </StyledContainer>
      
    );
  }
}
const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(BookLiveScreen);




