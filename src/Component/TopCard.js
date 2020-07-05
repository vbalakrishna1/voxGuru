// "https://res.cloudinary.com/voxguru/image/upload/v1511186657/Trailer thumbnails/Main-Trailer-Thumbnail.png"


import React, { Component } from 'react';
import { View, Image, TouchableOpacity , Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import { StyledVideoTitle, StyledImageContainer } from '../UI'
import Icon from 'react-native-vector-icons/MaterialIcons'

class TopCard extends Component { 
    constructor(props) {
        super(props);
        console.log("props top card==>",props);
        // this.ImageURI = props.img.courseThumbnail ? props.img.courseThumbnail : (props.img.TrailThumbnail ?props.img.TrailThumbnail : props.img.lessonVideoPhI);
        if(props.isHomepage){
          this.ImageURI =  props.img.courseThumbnail;
        } else{
          this.ImageURI =  (props.img.TrailThumbnail ? props.img.TrailThumbnail : props.img.lessonVideoPhI)
        }
        
        this.params = props.img.videoId || props.img.lessonVideo;
        this.trailImage = props.img.TrailThumbnail
      }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.props.openVideo(this.params)}>                  
                    <Image source = {{ uri: this.ImageURI }} style={{width: this.props.width, aspectRatio : this.props.TopCardAspectRatio,resizeMode:"cover"}} />
                </TouchableOpacity>
            </View>
        );
      }
}
TopCard.propTypes = {
    img: PropTypes.object.isRequired,
    openVideo: PropTypes.func.isRequired,
  };

export default TopCard



