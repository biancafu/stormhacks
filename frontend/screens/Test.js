import React from 'react'
import useNavigation from "@react-navigation/native";
import { View, Button, Image, Text, SafeAreaView, ScrollView } from 'react-native';


import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = ({navigation, route}) => {
  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async () => {
    try {
      const key = 'myKey';
      const value = 'myValue';
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully.');
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const retrieveData = async () => {
    try {
      const key = 'myKey';
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved value:', value);
      } else {
        console.log('Value does not exist.');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  const removeData = async () => {
    try {
      const key = 'myKey';
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully.');
    } catch (error) {
      console.log('Error removing data:', error);
    }
  };

  return (
    <View>
      <Text>This is {route.params.hello}'s meds</Text>
      <Button title="Store Data" onPress={storeData} />
      <Button title="Retrieve Data" onPress={retrieveData} />
      <Button title="Remove Data" onPress={removeData} />
    </View>
  );
};

export default Test;
