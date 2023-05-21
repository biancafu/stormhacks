import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MedicationReminderForm = () => {
  const [pillName, setPillName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const handlePillNameChange = (value) => {
    setPillName(value);
  };

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log('Pill Name:', pillName);
    console.log('Selected Days:', selectedDays);
    // You can save the reminder data or perform any other actions

    // Clear form fields
    setPillName('');
    setSelectedDays([]);
  };

  const isDaySelected = (day) => selectedDays.includes(day);

  return (
    <View >
      <TextInput
        placeholder="Pill Name"
        value={pillName}
        onChangeText={handlePillNameChange}
      />

      <View style={styles.daySelectorContainer}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, isDaySelected(day) && styles.selectedDayButton]}
            onPress={() => handleDayToggle(day)}
          >
            <Text style={[styles.dayButtonText, isDaySelected(day) && styles.selectedDayButtonText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Set Reminder" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  daySelectorContainer: {
    flexDirection: 'row',
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

export default MedicationReminderForm;
