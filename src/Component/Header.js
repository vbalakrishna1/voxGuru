import React, { Component } from 'react';
import {TouchableHighlight, Text, Image, View} from 'react-native';
import {StyledHeader, StyledTouchableOpacity, StyledText,AlignedText, StyledLeftBox,StyledBackIcon, StyledCenterBox, StyledMenuIcon} from '../UI/index';

import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props) => {
   return (
      <StyledHeader>
          <StyledLeftBox>
          <TouchableOpacity onPress = {()=>props.leftNavFunc()}>
          { props.leftNavMenu ? (<View style={{flexDirection: "row", alignContent: "flex-start", justifyContent: "space-between"}}>
                    <StyledMenuIcon name="md-menu"/>
                      <Image 
                      style={{maxHeight: 47, maxWidth: 73, resizeMode: 'contain', marginLeft:-20}}
                      source={require('../images/logo1.png')}/>
        </View>
        ):(<StyledBackIcon name="md-arrow-back"/>)}
          </TouchableOpacity>
          { !props.leftNavMenu && props.title ? (<AlignedText textalign={"Left"} selfalign={"Center"} padding={"5px"} color={"Dark"} weight={"Bold"} size={"Large"}>{props.title}</AlignedText>): null}
          </StyledLeftBox>
          <StyledCenterBox>
         </StyledCenterBox>
      </StyledHeader>
   )
}
export default Header