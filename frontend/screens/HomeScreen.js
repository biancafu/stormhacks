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
        </View></SafeAreaView>
}


export default HomeScreen;