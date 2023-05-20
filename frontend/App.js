import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40,
      }}
    >
      <View style={{ marginRight: 16 }}>
        <Icon name="person" size={24} color="black" />
      </View>
      <View style={{ marginLeft: 16 }}>
        <Icon name="search" size={24} color="black" />
      </View>
    </View>
  );
};

export default App;