import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import {AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddMeds from './screens/AddMeds';
import Test from './screens/Test';
import Test2 from './screens/Test2';

const Stack = createNativeStackNavigator();

export default function App() {

  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem(
  //       '@MySuperStore:key',
  //       'I like to save it.',
  //     );
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('TASKS');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens */}
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome'}} />
        <Stack.Screen name="AddMeds" component={AddMeds} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Test2" component={Test2} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
