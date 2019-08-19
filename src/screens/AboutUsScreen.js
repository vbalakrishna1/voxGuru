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
import Icon from 'react-native-vector-icons/MaterialIcons';
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
const width = Dimensions.get('window').width;

const AboutUsScreen = ({ openMenu, MainPage, openList }) => (
  <StyledContainer>
    <Header title={"About Us"} leftNavMenu={true} leftNavFunc={openMenu}/>

    <StyledBox style={styles.container}>
    <View style = {styles.container}>
        <View style={{flex: 0.5, flexDirection: "column"}}>
        <Image 
          style={{width:width,aspectRatio : 1.778, resizeMode: 'contain'}}
          source={{uri:MainPage.Img}}
        />
        </View>
        <View style={{flex: 0.3, flexDirection: "column", padding: 10 }}>
        <HTMLView
        value={MainPage.Text}
        stylesheet={styles}
      />
        </View>
        <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#6b38a5',
          borderRadius: 4,
          margin: 10,
        }}>
        <TouchableOpacity  onPress={openList}
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "space-between",
          paddingVertical: 10,
        }}> 
        <StyledText color={'Light'} weight={'Bold'}>  
            Meet All VoxGurus 
        </StyledText>
        <Icon size={18} name="arrow-forward" color='#ffffff' />
        </TouchableOpacity>
        </View>
      </View>
      </StyledBox>
  </StyledContainer>
);

AboutUsScreen.propTypes = {
  MainPage: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired,
  openList:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  MainPage: state.appUi.AboutUs.MainPage,
});

const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch(NavigationActions.navigate({routeName:'DrawerOpen' })),
    openList: () => dispatch(NavigationActions.navigate({routeName:'AboutAllScreen'}))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsScreen);