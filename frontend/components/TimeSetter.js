import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimerComponent = () => {
  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [selectedTime3, setSelectedTime3] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, time) => {
    setShowPicker(false);
    if (time !== undefined) {
      // Update the respective selectedTime state based on the picker index
      switch (pickerIndex) {
        case 1:
          setSelectedTime1(time);
          break;
        case 2:
          setSelectedTime2(time);
          break;
        case 3:
          setSelectedTime3(time);
          break;
        default:
          break;
      }
    }
  };

  const handleSetTime = (pickerIndex) => {
    setShowPicker(true);
    setPickerIndex(pickerIndex);
  };

  const handleSaveTime = () => {
    // Handle saving the selected times to local storage or perform other actions
    console.log('Selected Times:', selectedTime1, selectedTime2, selectedTime3);
    // ...
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Button title="Set Time 1" onPress={() => handleSetTime(1)} />
      <Button title="Set Time 2" onPress={() => handleSetTime(2)} />
      <Button title="Set Time 3" onPress={() => handleSetTime(3)} />

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}

      <View>
        {selectedTime1 && <Text>Timer 1: {selectedTime1.toLocaleTimeString()}</Text>}
        {selectedTime2 && <Text>Timer 2: {selectedTime2.toLocaleTimeString()}</Text>}
        {selectedTime3 && <Text>Timer 3: {selectedTime3.toLocaleTimeString()}</Text>}
        <Button title="Save Times" onPress={handleSaveTime} />
      </View>
    </View>
  );
};

export default TimerComponent;
