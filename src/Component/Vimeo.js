import React, { useState, useEffect } from 'react';
import WebViewBridge from 'react-native-webview-bridge';

function getVimeoPageURL(videoId) {
    return 'https://myagi.github.io/react-native-vimeo/v0.3.0.html?vid=' + videoId;
}

const Vimeo = (props) => {
    const [ vidId, setvidId ] = useState("")
    const handlers={}
    useEffect(() => {
        registerHandlers()
    }, [props])
    const registerHandlers = () => {
        registerBridgeEventHandler('ready', onReady);
        registerBridgeEventHandler('play', props.onPlay);
        registerBridgeEventHandler('playProgress', props.onPlayProgress);
        registerBridgeEventHandler('pause', props.onPause);
        registerBridgeEventHandler('finish', props.onFinish);
    }
    useEffect(() => {
        setvidId(props.videoId)
    })
    const registerBridgeEventHandler=(eventName, handler)=> {
        handlers[eventName] = handler;
      }
    const onReady = () => {
        if (props.onReady) props.onReady();
    }
    const onBridgeMessage = (message) => {
        console.log('------>',message)
        let payload;
        try {
          payload = JSON.parse(message);
        } catch (err) {
          return;
        }
        let handler = handlers[payload.name];
        if (handler) handler(payload.data);
      }
    return (
        <WebViewBridge
            style={{
                // Accounts for player border
                marginTop: -8,
                marginLeft: -10,
                height: 320,
                width: 320
            }}
            source={{ uri: getVimeoPageURL(vidId) }}
            scalesPageToFit={false}
            scrollEnabled={false}
            onMessage={onBridgeMessage}
            onError={(error) => console.error(error)}
        />)
};

export default Vimeo;
