import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddMeds = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, time) => {
    setShowPicker(false);
    if (time !== undefined) {
      setSelectedTime(time);
    }
  };

  const handleSetTime = () => {
    setShowPicker(true);
  };

  const handleSaveTime = () => {
    // Handle saving the selectedTime to local storage or perform other actions
    console.log(selectedTime);
    // ...
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Button title="Set Time" onPress={handleSetTime} />

      {showPicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}

      {selectedTime && (
        <View>
          <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
          <Button title="Save Time" onPress={handleSaveTime} />
        </View>
      )}
    </View>
  );
};

export default AddMeds;