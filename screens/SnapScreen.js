import React, { useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

import {Button, Overlay} from 'react-native-elements';

function SnapScreen(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  
  var camera = useRef(null);
 
  const [visible, setVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('Loading');

  useEffect(() => {  
    (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
  }, []);

  const overlayBackdropPress = () => {
    if(overlayText === 'Error no face detected (click out to dismiss') {
      setVisible(false);
    }
  }
  var data = new FormData();
  var cameraDisplay;
  if(hasPermission && props.isFocused){
    cameraDisplay = <Camera 
      style={{ flex: 1 }}
      type={type}
      ratio='16:9'
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
       <View    
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
          >
           <IconIonic
            name="md-reverse-camera"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
            <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
           </TouchableOpacity>

        </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }

  return (
    <View style={{flex: 1}}>
        <Overlay isVisible={visible} onBackdropPress={() => overlayBackdropPress()}  width="auto" height="auto">
          <Text>{overlayText}</Text>
        </Overlay>
        
        {cameraDisplay}
        <Button
            icon={
                <IconFontAwesome
                name="save"
                size={20}
                color="#ffffff"
                />
            } 
            title="Snap"
            buttonStyle={{backgroundColor: "#009788"}}
            type="solid"
            onPress={async () => {
                setVisible(true);
                if (camera) {
                    let photo = await camera.takePictureAsync({quality : 0.7});
                    data.append('picture', {
                      uri: photo.uri,
                      type: 'image/jpeg',
                      name: 'user_photo.jpg',
                    });
                    
                    var rawResponse = await fetch("http://192.168.1.27:3000/upload", {
                      method: 'post',
                      body: data
                    });
                    var response = await rawResponse.json();
                    console.log(response);
                    if(response.error === 'Pas de visage détécté') {
                      setOverlayText('Error no face detected (click out to dismiss)')
                      // setTimeout(setVisible(false),5000);
                    } else {
                      props.addPicture(response);
                      setVisible(false);
                    }
                }
            }}
        />
    </View>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    addPicture: function(picture) { 
      dispatch( {type: 'addPicture', picture: picture })
    }
  }
}

const reduxConnect = connect(
    null, 
    mapDispatchToProps
)(SnapScreen);
export default withNavigationFocus(reduxConnect);