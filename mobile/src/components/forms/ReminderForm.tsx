import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ReminderFormProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  selectedValues: Record<string, string>;
  setSelectedValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function ReminderForm({ selectedValues, setSelectedValues }: ReminderFormProps) {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Serviço</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9' }}>
        <Picker selectedValue={selectedValues.expenseType} onValueChange={(itemValue: string) => setSelectedValues(prev => ({ ...prev, expenseType: itemValue }))}>
          <Picker.Item label="Selecione Tipo de Despesa" value="" />
          <Picker.Item label="Combustível" value="combustivel" />
          <Picker.Item label="Manutenção" value="manutencao" />
        </Picker>
      </View>
    </>
  );
}