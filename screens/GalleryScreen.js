import React from 'react';
import {ScrollView, Platform, StatusBar} from 'react-native';

import {Card, Badge, Text, Image} from 'react-native-elements';
import {connect} from 'react-redux';

function GalleryScreen(props) {
  var cards = props.myPhotos.map((photo,i) => {
      return (
          <Card key={i}>
            <Image source={{uri: photo.url}} style={{ width: '100%', height: 400, marginBottom: 10}}/>
            <Badge status="success" value={photo.sexe}/>
            <Badge status="success" value={`${photo.age} ans`}/>
            <Badge 
              status="success" 
              value={photo.beard === true
                    ? 'barbe'
                    : 'imberbe'}/>
            <Badge 
              status="success" 
              value={photo.smile === true
                    ? 'joyeux !'
                    : 'pas content'}/>
            <Badge status="success" value={photo.hairColor}/>
          </Card>
      )
  });

  return (
    <ScrollView style={{marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <Text h4 style={{textAlign: 'center', marginTop: 16}}>Alex's Gallery</Text>
        {cards}
    </ScrollView>
  );
}
function mapStateToProps(state){
    return {myPhotos: state.photos}
  }
export default connect(
    mapStateToProps, 
    null
)(GalleryScreen);
