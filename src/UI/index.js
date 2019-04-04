import styled from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons';

export const StyledBox = styled.ScrollView`
    flex:1;
    background: #fefefe;
`;
export const StyledImageContainer = styled.View`
    width: 100%;
    height: auto;
    background: peachpuff;
`;

export const StyledFullWidthContainer = styled.View`
    width: 100%;
    height: auto;
`;

export const StyledListContainer = styled.View`
    width: 96%;
    height: auto;
    background: #fefefe;
    elevation:4;
    margin-top: 10px; 
      
`;

export const StyledImageCard = styled.View`
    width: auto;
    height: auto;
    background: #AF49E0;
    align-self: center;
    margin-start: 10px;
    margin-end: 10px;
    margin-top:5px;
    margin-bottom: 5px;
    elevation:5;
    borderRadius: 10;
    background: ${props => props.backgroundColor || "#AF49E0"};
`;

export const StyledContainer = styled.View`
    flex:1;
    justify-content: flex-start;
    background: #fefefe;
`;

export const StyledView = styled.View`
    padding: 20px;
    width: 100%;
    height: auto;
    background: #fefefe;
    align-self: center;
`;

export const StyledHeader = styled.View`
    flex-direction: row;
    min-height: 10%;
    max-height: 12%;
    width: 100%;
    height: auto;
    background: goldenrod;
    elevation: 5;
`;

export const StyledLeftBox = styled.View`
    flex-direction: row;
    align-self: center;
    padding-left:5px;
`;
export const StyledCenterBox = styled.View`
    align-self: center;
    position: absolute; left: 50%;
`;

export const StyledFloatBar = styled.View`
    flex-direction:row;
    position: absolute;
    bottom: 0;
    width: 100%;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 8%;
    background: black;
    opacity: 0.6;
`;

export const StyledFloatIcon = styled.View`
    flex-direction:row;
    position: absolute;
    top: 0;
    right: 0;
    width: 10%;
    opacity: 0.6;
    padding: 2.5px;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
`;

export const StyledMenuIcon = styled(Icon)`
    color: #fefefe;
    font-size: 30;
    align-self: center;
`;

export const StyledBackIcon = styled(Icon)`
    color: black;
    font-size: 30;
`;

export const StyledButton = styled.Button`
    color: purple;
`

export const StyledTouchableOpacity = styled.TouchableOpacity`
    padding: 5px;
    align-self: center;
`



export const Button = styled.TouchableOpacity`
    padding: 5px;
    align-self: center;
`

export const SmallButton = Button.extend`
    border: lightgrey;
    border-width: 0.5;
    border-radius:4;
    margin: 5px;
    background: purple;
`



const textColorChooser = ({ color }) => {
    switch(color) {
            case "HighLight":
            return "goldenrod";
                break;
            case "Dark":
            return"black";
                break;
            case "Light":
            return "white";
                break;
            case "Special":
            return  "purple";
                break;
            case "Grey":
            return  "grey";
                break;
            default:
            return "#333";
            }
}

const textSizeChooser = ({ size }) => {
    switch(size) {
        case "XLarge":
        return "24px";
            break;
            case "Large":
            return "18px";
                break;
            case "Medium":
            return "14px";
                break;
            case "Small":
            return  "12px";
                break;
            default:
            return"16px";
            }
}

const textWeightChooser = ({ weight }) => {
    switch(weight) {
            case "SemiBold":
            return "Nunito-SemiBold";
                break;
            case "Bold":
            return "Nunito-Bold";
                break;
            default:
            return"Nunito-Regular";
            }
}

const textAlignChooser = ({ textalign }) => {
    switch(textalign) {
            case "Center":
            return "center";
                break;
            case "Right":
            return "right";
                break;
            case "Left":
            return "left";
                break;
            case "Justify":
            return "justify";
                break;
            default:
            return "auto";
            }
}

const selfAlignChooser = ({ selfalign }) => {
    switch(selfalign) {
            case "Center":
            return "center";
                break;
            case "Right":
            return "right";
                break;
            case "Left":
            return "left";
                break;
            default:
            return "auto";
            }
}

export const StyledText = styled.Text`
	color: ${textColorChooser};
    font-family: ${textWeightChooser};   
    font-size: ${textSizeChooser};
    opacity: 1; 
`
export const AlignedText = StyledText.extend`
    text-align: ${textAlignChooser};
    padding: ${props => props.padding || "1px"};
    align-self: ${selfAlignChooser};
    flex-wrap: ${props => props.flexWrap || "nowrap"}; 

`


export const StyledSubText = StyledText.extend`
    font-size: 14px;
    
`
export const StyledSubTitle = StyledText.extend`
    font-size: 16px;
`
export const StyledTitle = StyledText.extend`
    padding-left: 5px;
    font-family: Nunito-Bold;
`



export const StyledHighLight = StyledText.extend`
    color: goldenrod;
`

export const StyledHighLightCenter = StyledHighLight.extend`
    text-align: center;
`
export const StyledVideoTitle = StyledSubTitle.extend`
    color: white;
`
export const StyledVideoBar = styled.View`
    flex-direction:row;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0, 0.2);
    padding: 2.5px;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
    height: 20%;
    align-items:center;
`;