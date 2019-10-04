import React, { Component } from 'react';
import { TouchableOpacity, Text, FlatList, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { StyledHeader, StyledTouchableOpacity, StyledText, AlignedText, StyledLeftBox, StyledBackIcon, StyledCenterBox, StyledMenuIcon } from '../UI/index';

import Icon from 'react-native-vector-icons/Ionicons';


class RadioButton extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      userIN: this.props.user.userIN,
      cost: this.props.params ? (this.props.user.userIN ? this.props.params.cost.Indian : this.props.params.cost.Other) : null,
      button: 1,
    }

  }

  _onclick = (button) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      return button !== false ? { button } : { button: -1 };
    });
  };

  _renderContent = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this._onclick(index)}>
        <View style={{
          backgroundColor: this.state.button === index ? "#ffbc00" : "white", elevation: 4, margin: 5, borderWidth: 1, padding: 5,
          alignItems: "center", paddingRight: 10, borderRadius: 4,
          flexDirection: "row", borderColor: this.state.button === index ? "#6b38a5" : "#fefefe", justifyContent: "space-around", flexWrap: "nowrap"
        }}>
          {(this.state.button === index)
            ? (<Icon size={28} name="md-radio-button-on" color='#6b38a5' />)
            : (<Icon size={28} name="md-radio-button-off" color='#6b38a5' />)}
          <View>
            <AlignedText size={"XLarge"} weight={"SemiBold"} padding={"2px"}>{item.label}</AlignedText>
            <AlignedText color={"Grey"} weight={"SemiBold"} padding={"2px"}>{item.sublabel}</AlignedText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      this.props.params ? (
        <View style={{ paddingHorizontal: 5 }}>

          <View style={{
            padding: 10,
            margin: 10,
            borderRadius: 4,
          }}>
            <AlignedText selfalign={"Center"} textalign={"Center"}>Please Subscribe</AlignedText>
            <AlignedText weight={'SemiBold'} selfalign={"Center"} textalign={"Center"} size={"Large"}>{this.props.params.info.currentLevelName}</AlignedText>
            <AlignedText selfalign={"Center"} textalign={"Center"}>Choose your plan</AlignedText>
          </View>
          <View style={{ paddingVertical: 5 }}>
            <FlatList
              data={this.state.cost}
              renderItem={({ item, index }) => this._renderContent(item, index)}
              keyExtractor={(item, index) => item.label}
              extraData={this.state}
            />
          </View>
          {
            this.state.button > -1 &&
            <View style={{ paddingHorizontal: 5 }}>
              <TouchableOpacity onPress={() => this.props.planSubmit(this.state.cost[this.state.button])} style={{ backgroundColor: '#6b38a5', alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Pay Now</Text>
              </TouchableOpacity>
              {/* <Button onPress={()=>this.props.planSubmit(this.state.cost[this.state.button])}
                title="Pay Now"
                color="#6b38a5"
                accessibilityLabel="Submit Plan Choice"
                style={{margin:20}}
            /> */}
            </View>
          }
        </View>
      ) : null
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);