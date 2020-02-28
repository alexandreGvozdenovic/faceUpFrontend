import React from 'react';
import {ScrollView} from 'react-native';

import {Card, Badge, Text} from 'react-native-elements';

export default function GalleryScreen() {
  return (
    <ScrollView style={{marginTop: 25}}>
        <Text h4 style={{textAlign: 'center'}}>John's Gallery</Text>
        <Card image={require('../assets/picture-1.jpg')}>
            <Badge status="success" value="homme"/>
            <Badge status="success" value="70 ans"/>
            <Badge status="success" value="barbe"/>
            <Badge status="success" value="joyeux !"/>
            <Badge status="success" value="cheveux gris"/>
        </Card>
        <Card image={require('../assets/picture-2.jpg')}>
            <Badge status="success" value="femme"/>
            <Badge status="success" value="lunette"/>
            <Badge status="success" value="31 ans"/>  
            <Badge status="success" value="joyeux !"/>
            <Badge status="success" value="cheveux chatain"/>
        </Card>
        <Card image={require('../assets/picture-3.jpg')}>
            <Badge status="success" value="homme"/>
            <Badge status="success" value="lunette"/>
            <Badge status="success" value="27 ans"/>
            <Badge status="success" value="cheveux noirs"/>
        </Card>
        <Card image={require('../assets/picture-4.jpg')}>
            <Badge status="success" value="femme"/>
            <Badge status="success" value="lunette"/>
            <Badge status="success" value="68 ans"/>
            <Badge status="success" value="cheveux gris"/>
        </Card>
    </ScrollView>
  );
}
