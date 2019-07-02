'use strict'

// React
import React from 'react'
import { Modal, Text, Button } from  'react-native'
import firebase from 'react-native-firebase'
//Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.isOpen,
        data: state.modal.payload
    }
}

class ModalNavigation extends React.Component {

        constructor() {
          super();
          this.unsubscribe = null;
          this.state = {
            modalVisible: false,
          };
        }
      
        componentDidMount() {
          this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.props.dispatch(this.closeModal());
              console.log("close");
              console.log(user);
            } else {
              this.props.dispatch(this.fetchPosts());
              console.log("fetch");
            }
          });
        }
      
        componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
          }
          console.log("modal unmounted");
        }
      




    componentWillReceiveProps(nextProps) {
        if(nextProps.modalOpen !== this.props.modalOpen) {
            if (nextProps.modalOpen) {
                this.setState({modalVisible: true})
            } else {
                this.setState({modalVisible: false})
            }
        }
    }

    openModal = () => {
        return{ type:'OPEN_MODAL', payload: null }
    }

    closeModal = () => {
        return{ type:'CLOSE_MODAL', payload: null }
    }
    
    onLearnMore = () =>{
        this.props.dispatch(this.closeModal());
    }

    fetchPosts = (dispatch) => {
        return dispatch => {
            dispatch(this.openModal());
           return firebase.auth().signInWithEmailAndPassword('durgaprasad814@gmail.com', '05001A0814')
                .then( console.log("inside fetch"))
                .then((user) => {
                    console.log('user created', user);
                    dispatch(this.closeModal());
                })
                .catch((err) => {
                    console.error('An error occurred', err);
                });
        }
      }

  render(){
    return (
      <Modal
      visible={this.state.modalVisible}
      animationType={'slide'}>
        <Text> Working </Text>
        <Button onPress={this.onLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>{this.props.data} </Text>
      </Modal>
    )
  }
}
export default connect(mapStateToProps)(ModalNavigation)


export const modalReducer = (state,action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            console.log("1");
            return { ...state, isOpen: true, payload: action.payload }
            break;
        case 'CLOSE_MODAL':
        console.log("2");
            return { ...state, isOpen: false, payload: action.payload }
            break;
        default:
        console.log("3");
            return {...state, isOpen: false};
    }
  }
