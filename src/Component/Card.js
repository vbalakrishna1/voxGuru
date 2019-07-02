import React, { Component, PureComponent } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import { AlignedText, StyledImageCard } from '../UI';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flexDirection: 'row'
  }
});


export default class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      AspectRatio: 1.0,
      ViewRatio: 1.1
    }
    //this.ImageURI = props.item.courseThumbnail;
    this.ImageURI = props.item.courseThumbnail1;
    this.params = props.id;
  }

  render() {
    return (
      <View style={{ width: '50%', aspectRatio: this.state.ViewRatio,flexDirection: 'row'}}>

        <Image source={{ uri: this.ImageURI }} style={{ width: this.props.width * 0.16, aspectRatio: this.state.AspectRatio, alignSelf: 'center',marginRight: 10,marginLeft: 10}} />
        <AlignedText  color={"Light"} selfalign={"Center"} padding={"0px"}>{this.props.item.courseTitile}</AlignedText>

      </View>


    );
  }
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};