import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSetter from "../components/TimeSetter"
import DateTimePicker from '@react-native-community/datetimepicker';


const Test2 = ({navigation}) => {
  const [name, setName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [number, setNumber] = useState('');

  const handleNextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handlePreviousScreen = () => {
    setCurrentScreen(currentScreen - 1);
  };

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
  };

  const isDaySelected = (day) => selectedDays.includes(day);

  const handleSaveData = async () => {
    try {
      const data = { name, week: selectedDays, frequency };
      await AsyncStorage.setItem('formData', JSON.stringify(data));
      console.log(data)
      navigation.popToTop();
      //navigate somewhere
      // Clear form data
      setName('');
      setSelectedDays('');
      setFrequency('');
      // Reset to the first screen
      setCurrentScreen(1);
      // Display success message or navigate to another screen
      // ...
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

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


  const handleNumberChange = (value) => {
    // Remove any non-numeric characters from the input value
    const numericValue = value.replace(/[^0-9]/g, '');
    setNumber(numericValue);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <View>
            <Text>Medication Name</Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter value for Field 1"
            />
            <Button title="Next" onPress={handleNextScreen} />
          </View>
        );
      case 2:
        return (
          <View style={styles.daySelectorContainer}>
            <Text>How often do you take it:</Text>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, isDaySelected(day) && styles.selectedDayButton]}
            onPress={() => handleDayToggle(day)}
          >
            <Text style={[styles.dayButtonText, isDaySelected(day) && styles.selectedDayButtonText]}>{day}</Text>
          </TouchableOpacity>
        ))}
            <Button title="Previous" onPress={handlePreviousScreen} />
            <Button title="Next" onPress={handleNextScreen} />
          </View>
        );
      case 3:
        return (
          <View>
            <Text>How many times per day:</Text>
            <TextInput
            value={number}
            onChangeText={handleNumberChange}
            keyboardType="numeric"
            placeholder="Enter a number"
            />
            <Button title="Previous" onPress={handlePreviousScreen} />
            <Button title="Next" onPress={handleNextScreen} />
          </View>
        );
      case 4:
        return (
           <View style={{ flex: 1, justifyContent: 'row', paddingHorizontal: 20 }}>
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
          <Text>{selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
          <Button title="Save Time" onPress={handleNextScreen} />
        </View>
      )}
        </View>
      );
      case 5:
        return(
          <View>
            <Text>Summary</Text>
            <Button title="Previous" onPress={handlePreviousScreen} />
            <Button title="Save" onPress={handleSaveData} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      {renderScreen()}
    </View>
  );
};


const styles = StyleSheet.create({
    daySelectorContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    dayButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      width: '14%',
      alignItems: 'center',
    },
    selectedDayButton: {
      backgroundColor: '#ccc',
    },
    dayButtonText: {
      fontSize: 16,
    },
    selectedDayButtonText: {
      fontWeight: 'bold',
    },
  });
export default Test2;
