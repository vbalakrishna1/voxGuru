import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   Share,
   TouchableHighlight,
   Modal,
   ScrollView,
   Alert,
   Dimensions,
   Image,
   FlatList,
   Button,
   Linking
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyledText, StyledImageCard, StyledContainer, StyledBox, StyledImageContainer, StyledListContainer, StyledVideoBar, AlignedText } from '../UI';
import Header from '../Component/Header';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fefefe",
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
   bigButton: {
      width: "80%",
      alignItems: 'center',
      backgroundColor: '#6b38a5',
      margin: 5,
      height: 40,
      marginLeft: 40,
      marginRight: 40,
      borderRadius: 2,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 1,
      shadowOffset: {
         height: 1,
         width: 0.3,
      }
   },
});


class HelpCenterScreen extends React.Component {

   constructor(props) {
      super(props);
      this.state = { onClick: -1 };
   }

   _renderContent = (item) => {
      if (item.index != this.state.onClick) {
         return (
            <TouchableOpacity onPress={() => this._onclick(item.index)}>
               <View style={{
                  backgroundColor: "white", elevation: 4, margin: 5, borderWidth: 1, padding: 5,
                  alignItems: "baseline", paddingRight: 10, borderRadius: 4,
                  flexDirection: "row", borderColor: "#fefefe", justifyContent: "space-between", flexWrap: "nowrap"
               }}>
                  <AlignedText weight={"SemiBold"} padding={"5px"}>Q: {item.title}</AlignedText>
               </View>
            </TouchableOpacity>
         )
      }
      else {
         return (
            <View>
               <TouchableOpacity onPress={this._onclick}>
                  <View style={{
                     backgroundColor: "white", elevation: 4, margin: 5, borderWidth: 1, padding: 5,
                     alignItems: "baseline", paddingRight: 10, borderRadius: 4,
                     flexDirection: "row", borderColor: "goldenrod", justifyContent: "space-between", flexWrap: "nowrap"
                  }}>
                     <AlignedText padding={"5px"}> Q: {item.title}</AlignedText>
                  </View>
               </TouchableOpacity>
               <View style={{ backgroundColor: "white", elevation: 4, margin: 5 }}>
                  <AlignedText padding={"5px"}>A: {item.content}</AlignedText>
               </View>
            </View>
         )
      }
   }
   _onclick = (onClick) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
         return onClick !== false ? { onClick } : { onClick: -1 };
      });
   };

   render() {
      return (
         <View style={styles.container}>
            <Header title={"Help Center"} leftNavMenu={true} leftNavFunc={this.props.openMenu} />
            <StyledBox>
               <View style={{ flex: 0.3, flexDirection: "column", justifyContent: 'flex-end', paddingBottom: 20 }}>
                  <Image
                     style={{
                        flex: -1,
                        width: 360,
                        height: 170,
                        resizeMode: 'contain',
                     }}
                     source={require('../images/needHelp.png')} />
               </View>
               <View style={{ flex: 0.1, flexDirection: "column", justifyContent: 'flex-end', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "grey", borderRadius: 10 }}>
                  <TouchableOpacity onPress={() => Linking.openURL('mailto:voxguru@pratibhamusic.com?subject=VoxGuru Help Request').catch(err => console.error('An error occurred', err))}>
                     <View style={styles.bigButton}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: "center" }}>
                           <Icon name="email" color='#ffbb00' size={24} />
                           <StyledText size={"Large"} color={"HighLight"}>Email Us.</StyledText>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={{ flex: 0.6, flexDirection: "column", justifyContent: 'center', padding: 10, width: this.state.width }}>
                  <AlignedText size={"Large"} text-self={"Center"} align-self={"Center"}>Frequently asked Questions</AlignedText>
                  <FlatList
                     data={this.props.HelpScreen}
                     renderItem={({ item }) => this._renderContent(item)}
                     keyExtractor={(item, index) => item.title}
                     extraData={this.state}
                  />
               </View>
            </StyledBox>
         </View>
      )
   }
}

HelpCenterScreen.propTypes = {
   HelpScreen: PropTypes.array.isRequired,
   openMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   HelpScreen: state.appUi.HelpScreen.SECTIONS,
});

const mapDispatchToProps = dispatch => ({
   openMenu: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenterScreen);