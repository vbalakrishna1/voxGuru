import React, { Component } from 'react';
import { TouchableOpacity, Text, FlatList, View, Button, Image } from 'react-native';

import { connect } from 'react-redux';
import { StyledHeader, StyledTouchableOpacity, StyledText, AlignedText, StyledLeftBox, StyledBackIcon, StyledCenterBox, StyledMenuIcon } from '../UI/index';

import Icon from 'react-native-vector-icons/MaterialIcons';
const debounce = require('lodash.debounce');
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

export class LessonCard extends Component {
  constructor(props) {
    super(props);
    let progressState = 0;
    let progressStatus = '';
    let isActive = false;

    if (this.props.courseActive) {
      let myRe = new RegExp('[1-9][0-9]?$', 'g');
      let myArray = myRe.exec(this.props.item.lessonId);
      let newNum = Number(myArray[0]);

      if (newNum < this.props.currentLessonNum) {
        progressState = 1;
      } else {
        if (newNum === this.props.currentLessonNum) {
          progressState = this.props.user.user.LessonStatus[this.props.params.info.currentLevelId].currentStatusLevel;
          progressStatus = this.props.user.user.LessonStatus[this.props.params.info.currentLevelId].currentStatus;
        }
      }



      if (this.props.user.user.LessonStatus[this.props.params.info.currentLevelId]) {
        isActive = true;
      }
    }

    this.state = {
      progressState, progressStatus, isActive
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courseActive) {
      let myRe = new RegExp('[1-9][0-9]?$', 'g');
      let myArray = myRe.exec(nextProps.item.lessonId);
      let newNum = Number(myArray[0]);
      let progressState = 0;
      let progressStatus = '';
      if (newNum < nextProps.currentLessonNum) {
        progressState = 1;
      } else {
        if (newNum === nextProps.currentLessonNum) {
          progressState = nextProps.user.user.LessonStatus[nextProps.params.info.currentLevelId].currentStatusLevel;
          progressStatus = nextProps.user.user.LessonStatus[nextProps.params.info.currentLevelId].currentStatus;
        }
      }

      let isActive = false;

      if (nextProps.user.user.LessonStatus[nextProps.params.info.currentLevelId]) {
        isActive = true;
      }

      console.log(progressStatus);
      this.setState({
        progressState, progressStatus, isActive
      });
    }



  }

  _renderProgress = (progressState, progressStatus) => {
    if (progressState < 1 && progressState > 0) {
      return (
        <View>
          <View style={{ paddingLeft: 2, paddingBottom: 2 }}>
            <Progress.Bar color={'rgba(107, 56, 165, 1.0)'} borderRadius={6} progress={progressState} height={10} animated={true} />
          </View>
          <AlignedText size={"Small"} textalign={"Justify"}>{progressStatus}</AlignedText>
        </View>
      );
    } else {
      return null
    }
  }

  _renderCheck = (progressState) => {
    if (progressState === 1) return <Icon name="check-circle" color='#6b38a5' size={20} />
  }

  render() {
    return (
      <View>
        {this.props.courseActive ? (
          <TouchableOpacity onPress={debounce(() =>
            this.props.onViewAll(this.props.item.lessonId, this.state.isActive, this.state.progressState, this.props.lessonName,
              this.props.courseActive, this.props.params), 1000, { leading: true, trailing: false })}
            style={{ padding: 5, elevation: 5, margin: 5, }}>
            <View style={{ elevation: 1, borderRadius: 2, flexDirection: "row" }}>
              {(this.state.progressState < 1 && this.state.progressState > 0) ?
                (
                  <Image source={{ uri: this.props.item.activeImg }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />

                ) : (
                  <Image source={{ uri: this.props.item.img }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                )}
              <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
                <AlignedText size={"Large"} weight={"SemiBold"}>{this.props.item.title}</AlignedText>
                <AlignedText size={"Medium"} textalign={"Justify"}>{this.props.item.content}</AlignedText>

                <View style={{ flex: -1, paddingVertical: 5, marginLeft: -2 }}>
                  {this._renderProgress(this.state.progressState, this.state.progressStatus)}
                </View>
                <View style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  padding: 5,
                  right: 0,
                  top: 0,
                }}>
                  {this._renderCheck(this.state.progressState)}
                </View>
              </View>
            </View>

          </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={debounce(() =>
              this.props.onViewAll(this.props.item.lessonId, this.state.isActive, this.state.progressState, this.props.lessonName,
                this.props.courseActive, this.props.params), 1000, { leading: true, trailing: false })}
              style={{ padding: 5, elevation: 5, margin: 5, }}>
              <View style={{ elevation: 1, borderRadius: 2, flexDirection: "row" }}>
                <Image source={{ uri: this.props.item.img }} style={{ width: 100, aspectRatio: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                <View style={{ justifyContent: "center", padding: 5, flexWrap: "wrap", flex: 1 }}>
                  <AlignedText size={"Large"} weight={"SemiBold"}>{this.props.item.title}</AlignedText>
                  <AlignedText size={"Medium"} textalign={"Justify"}>{this.props.item.content}</AlignedText>
                </View>
              </View>

            </TouchableOpacity>
          )
        }
      </View>
    )
  }

}

LessonCard.propTypes = {
  lessonName: PropTypes.string,
  currentLessonNum: PropTypes.number,
  user: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onViewAll: PropTypes.func.isRequired,
  courseActive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LessonCard);