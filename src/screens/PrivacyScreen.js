import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Alert, StatusBar, ToastAndroid, ScrollView,FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StyledContainer,
          StyledImageContainer, StyledFullWidthContainer,
          StyledListContainer,
          StyledVideoBar,
          StyledText,
          StyledButton,
          StyledBox, 
          StyledFloatBar, 
          SmallButton, 
          AlignedText, StyledImageCard} from '../UI';
import Header from '../Component/Header';

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


const PrivacyScreen = ({ openMenu, PrivacyPolicy }) => (
  <View style={{flex:1}}>
            <Header title={"Privacy Policy"} leftNavMenu={true} leftNavFunc={openMenu}/>
      <ScrollView style={styles.container}>
      <HTMLView
        value={PrivacyPolicy}
        stylesheet={styles}
      />
      </ScrollView>
  </View>
);

PrivacyScreen.propTypes = {
  PrivacyPolicy: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  PrivacyPolicy: state.appUi.PrivacyPolicy.body,
});

const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch(NavigationActions.navigate({routeName:'DrawerOpen' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyScreen);