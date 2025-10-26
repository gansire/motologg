import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputWithIcon from './InputWithIcon';
import { useDateTimePicker } from '../../hooks/useDateTimePicker';

interface ServiceExpenseFormProps {
    formData: Record<string, string>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    selectedValues: Record<string, string>;
    setSelectedValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    type: string; // Para distinguir "Serviço" de "Despesa" se necessário
}

export default function ServiceExpenseForm({ formData, setFormData, selectedValues, setSelectedValues }: ServiceExpenseFormProps) {
    const { date, time, showDatePicker, showTimePicker, setShowDatePicker, setShowTimePicker, onDateChange, onTimeChange } = useDateTimePicker(setFormData);
    const lastKm = '15000';
    return (
        <>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginRight: 5, backgroundColor: '#f9f9f9' }}
                >
                    <Icon name="calendar-today" size={20} color="#007AFF" style={{ marginRight: 10 }} />
                    <Text>{formData.date || 'Data (DD/MM/AAAA)'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowTimePicker(true)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, backgroundColor: '#f9f9f9' }}
                >
                    <Icon name="access-time" size={20} color="#007AFF" style={{ marginRight: 10 }} />
                    <Text>{formData.time || 'Hora (HH:MM)'}</Text>
                </TouchableOpacity>
            </View>
            {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />}
            {showTimePicker && <DateTimePicker value={time} mode="time" display="default" onChange={onTimeChange} />}
            <View style={{ marginBottom: 15 }}>
                <InputWithIcon iconName="speed" placeholder="Odômetro" value={formData.odometer} onChangeText={(text: string) => setFormData(prev => ({ ...prev, odometer: text }))} />
                <Text style={{ fontSize: 10, color: '#666', textAlign: 'right', marginTop: 5 }}>Último km: {lastKm}</Text>
            </View>
            <InputWithIcon iconName="attach-money" placeholder="Valor" value={formData.value} onChangeText={(text: string) => setFormData(prev => ({ ...prev, value: text }))} />
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 15 }}>
                <Picker selectedValue={selectedValues.serviceType} onValueChange={(itemValue: string) => setSelectedValues(prev => ({ ...prev, serviceType: itemValue }))}>
                    <Picker.Item label="Selecione Tipo de Serviço" value="" />
                    <Picker.Item label="Troca de Óleo" value="oleo" />
                    <Picker.Item label="Revisão" value="revisao" />
                </Picker>
            </View>
            <InputWithIcon iconName="location-on" placeholder="Local" value={formData.location} onChangeText={(text: string) => setFormData(prev => ({ ...prev, location: text }))} />
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9' }}>
                <Picker selectedValue={selectedValues.paymentMethod} onValueChange={(itemValue: string) => setSelectedValues(prev => ({ ...prev, paymentMethod: itemValue }))}>
                    <Picker.Item label="Selecione Forma de Pagamento" value="" />
                    <Picker.Item label="Dinheiro" value="dinheiro" />
                    <Picker.Item label="Cartão" value="cartao" />
                </Picker>
            </View>
        </>
    );
}