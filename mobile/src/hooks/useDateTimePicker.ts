import { useState } from 'react';
import { Platform } from 'react-native';

export const useDateTimePicker = (setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setFormData(prev => ({ ...prev, date: selectedDate.toLocaleDateString('pt-BR') }));
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
      setFormData(prev => ({ ...prev, time: selectedTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }));
    }
  };

  return {
    date,
    time,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onDateChange,
    onTimeChange,
  };
};