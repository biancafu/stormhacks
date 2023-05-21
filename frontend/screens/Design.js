import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const Design = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image 
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Good morning,
            </Text>
            <Text className="font-bold text-xl">
              Grandma
            </Text>
          </View> 
          {/* Icon size={35} color="#00CCBB" /> */}
        </View>

      {/* body */}
      <TouchableOpacity>
        <Text className="items-center text-white font-bold">
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="items-center text-white font-bold">
          Add Med
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="items-center text-white font-bold">
          HELP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Design;