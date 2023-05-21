import React from 'react'
import useNavigation from "@react-navigation/native";
import { View, Button, Image, Text, SafeAreaView, ScrollView } from 'react-native';
const HomeScreen = ({navigation}) => {
    // const navigation = useNavigation();
    return <SafeAreaView><View>
        <Text>Hellow</Text>
        <Button
        onPress={() => navigation.navigate('AddMeds', {hello:"world"})}
        title="Add Manually"
        />      
        <Button
        onPress={() => navigation.navigate('Test', {hello:"world2"})}
        title="Test"
        />  
        <Button
        onPress={() => navigation.navigate('Test2', {hello:"world3"})}
        title="Test2"
        />          
        </View></SafeAreaView>
}


export default HomeScreen;