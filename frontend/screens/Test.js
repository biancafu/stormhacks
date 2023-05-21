import { View, Button, Image, Text, SafeAreaView, ScrollView, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = ({navigation, route}) => {

  const [data, setData] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('myData');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  const storeData = async () => { //array of objects
    try {
      const newData = [...data, { key, value }];
      setData(newData);
      await AsyncStorage.setItem('myData', JSON.stringify(newData));
      console.log('Data stored successfully.');
      console.log('data', data)
      //reset keys and  values input field
      setKey('');
      setValue('');
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const editData = async (item) => {
    try {
      const newData = data.map((dataItem) => {
        if (dataItem.key === item.key) {
          return { ...dataItem, value };
        }
        return dataItem;
      });
      setData(newData);
      await AsyncStorage.setItem('myData', JSON.stringify(newData));
      console.log('Data edited successfully.');
      setKey('');
      setValue('');
    } catch (error) {
      console.log('Error editing data:', error);
    }
  };

  const deleteData = async (item) => {
    try {
      const newData = data.filter((dataItem) => dataItem.key !== item.key);
      setData(newData);
      await AsyncStorage.setItem('myData', JSON.stringify(newData));
      console.log('Data deleted successfully.');
      setKey('');
      setValue('');
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Text style={{ flex: 1 }}>{item.key}: {item.value}</Text>
      <Button title="Edit" onPress={() => editData(item)} />
      <Button title="Delete" onPress={() => deleteData(item)} />
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Enter key"
        onChangeText={text => setKey(text)}
        value={key}
      />
      <TextInput
        placeholder="Enter value"
        onChangeText={text => setValue(text)}
        value={value}
      />
      <Button title="Store Data" onPress={storeData} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

};

export default Test;
