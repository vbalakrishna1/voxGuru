import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../Component/Header';




const AboutAllScreen = ({ onCourse, goBack,about, renderRow }) => (

  <View style={{flex:1}}>
  <Header title={"About Us"} leftNavMenu={false} leftNavFunc={goBack}/>
  <ScrollView style={{flex: 1, paddingTop: 20}} contentContainerStyle={{}}>
  <View style={{flexDirection: "row", flexWrap:"wrap", justifyContent:"space-between"}}>
   {about.map((item,key) => {
    return (
    renderRow(item, key)
    );
  })
  }
  </View>
</ScrollView>
</View>
);

AboutAllScreen.propTypes = {
  about: PropTypes.array.isRequired,
  onCourse: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  about:state.appUi.AboutUs.VoxGurusList,
});

const mapDispatchToProps = dispatch => ({
  onCourse: (params) => dispatch(NavigationActions.navigate({routeName:'AboutGuruScreen', params })),
  goBack: () => dispatch(NavigationActions.back()),

  renderRow: (rowData, key) => {
    // var rowHash = Math.abs(hashCode(rowData));
    var img = rowData.guruThumbnail;
    return (
     <TouchableHighlight onPress={() => dispatch(NavigationActions.navigate({routeName:'AboutGuruScreen', params:rowData }))} underlayColor={'yellow'} key={key}>
        <View>
            <View style={{ width: 120, padding: 10, alignItems: "center"}}>
            <Image
              style={{
                    flex: -1,
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
              }}
              source={{uri: img}}/>
              <View style={{paddingTop: 10}}>
              <Text style= {{fontSize: 16, textAlign: "center"}} numberOfLines={1}> {rowData.guruName} </Text>
              <Text style= {{fontSize: 12, textAlign: "center"}} numberOfLines={1}> {rowData.guruSurName} </Text>
              </View>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutAllScreen);