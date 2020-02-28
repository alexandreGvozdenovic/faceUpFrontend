console.disableYellowBox = true;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen';

import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

var BottomNavigator = createBottomTabNavigator({
  Snap: SnapScreen,
  Gallery: GalleryScreen
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Snap') {
        iconName = 'ios-camera';
      } else if (navigation.state.routeName == 'Gallery') {
        iconName = 'md-photos';
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#009788',
    inactiveTintColor: '#FFFFFF',
    style: {
      backgroundColor: '#111224',
    }
  }  

}
);

StackNavigator = createStackNavigator({
  Home: HomeScreen,  
  BottomNavigator: BottomNavigator
}, 
{headerMode: 'none'}
);  

export default Navigation = createAppContainer(StackNavigator);