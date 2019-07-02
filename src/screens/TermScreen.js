import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import WebPage from '../Component/WebPage';
import Header from '../Component/Header';
import { View, Alert, StatusBar, ToastAndroid, ScrollView,FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Button, Linking } from 'react-native';

import {StyledText, StyledContainer, StyledBox} from '../UI';

import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fefefe',
  padding: 10
},
h4: {
  fontSize: 16,
  fontFamily: "Nunito-Bold",
},
h6: {
  fontSize: 14,
  fontFamily: "Nunito-Bold",
},
div: {
  fontSize: 14,
  fontFamily: "Nunito-Regular",
},
});


class TScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params: undefined,
      // params: props.navigation.state.params.ScreenName,
    }
  }

  componentDidMount() {

  }


  

  render() {

   
    const backAction = NavigationActions.back({
      routeName: 'HomeScreen',
    });

    return (
      <StyledContainer>
      <Header title={"Terms & Conditions"} leftNavMenu={false} leftNavFunc={() => this.props.navigation.dispatch(NavigationActions.back())}/>
      <StyledBox>
      <HTMLView
        value={this.props.Terms}
        stylesheet={styles}
        onLinkPress={(url) => Linking.openURL(url).catch(err => console.log('An error occurred', err))}
      />
      
      {/* need to handle url parsing as this has qoutes and other stuff around it. */}

      </StyledBox>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  Terms: state.appUi.Terms.body,
});

const mapDispatchToProps = dispatch => ({

});

export default TermScreen = connect(mapStateToProps, mapDispatchToProps)(TScreen);