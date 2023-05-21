import React from 'react'
import useNavigation from "@react-navigation/native";
import { View, Button, Image, Text, SafeAreaView, ScrollView } from 'react-native';


const AddMeds = ({navigation, route}) => {
    return <Text>This is {route.params.hello}'s meds</Text>
}
export default AddMeds;