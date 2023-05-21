import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimeSetter = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSaveTime = () => {
    // Handle saving the selectedTime to local storage or perform other actions
    console.log(selectedTime);
    // ...
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Button title="Set Time" onPress={() => setShowPicker(true)} />

      <DateTimePickerModal
        isVisible={showPicker}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={handleCancel}
      />

      {selectedTime && (
        <View>
          <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
          <Button title="Save Time" onPress={handleSaveTime} />
        </View>
      )}
    </View>
  );
};

export default TimeSetter;
