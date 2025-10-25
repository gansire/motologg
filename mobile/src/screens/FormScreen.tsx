import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'FormScreen'>;

export default function FormScreen() {
  const navigation = useNavigation();
  const route = useRoute<FormScreenRouteProp>();
  const { type, fields } = route.params;

  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedIncomeType, setSelectedIncomeType] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const lastKm = '15000';

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formatted = (parseFloat(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatted;
  };

  const validateField = (key: string, value: string) => {
    const field = fields.find(f => f.key === key);
    if (!field) return;
    let error = '';
    if (field.required && !value.trim()) {
      error = `${field.label} é obrigatório.`;
    }
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const handleChangeText = (key: string, value: string) => {
    let formattedValue = value;
    if (key === 'value' && type !== 'Abastecimento') {
      formattedValue = formatCurrency(value);
    }
    setFormData(prev => ({ ...prev, [key]: formattedValue }));
    validateField(key, formattedValue);
  };

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

  const handleSave = () => {
    const requiredFields = fields.filter(field => field.required);
    const missing = requiredFields.find(field => !formData[field.key]);
    if (missing) {
      Alert.alert('Erro', `Preencha o campo: ${missing.label}`);
      return;
    }
    console.log('Dados salvos:', { type, ...formData, selectedExpenseType, selectedFuelType, selectedIncomeType, selectedServiceType, selectedPaymentMethod });
    Alert.alert('Sucesso', `${type} adicionado ao histórico!`);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}));
    setErrors({});
    setSelectedExpenseType('');
    setSelectedFuelType('');
    setSelectedIncomeType('');
    setSelectedServiceType('');
    setSelectedPaymentMethod('');
    navigation.goBack();
  };

  const InputWithIcon = ({ iconName, placeholder, value, onChangeText, keyboardType = 'default', multiline = false, error }: any) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: error ? '#ff0000' : '#ddd', borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#f9f9f9' }}>
      <Icon name={iconName} size={20} color="#007AFF" style={{ marginRight: 10 }} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
      />
    </View>
  );

  const renderForm = () => {
    switch (type) {
      case 'Lembrete':
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
              <Picker selectedValue={selectedExpenseType} onValueChange={setSelectedExpenseType}>
                <Picker.Item label="Selecione Tipo de Despesa" value="" />
                <Picker.Item label="Combustível" value="combustivel" />
                <Picker.Item label="Manutenção" value="manutencao" />
              </Picker>
            </View>
          </>
        );
      case 'Receita':
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
              <InputWithIcon iconName="speed" placeholder="Odômetro" value={formData.odometer} onChangeText={(text: string) => handleChangeText('odometer', text)} />
              <Text style={{ fontSize: 10, color: '#666', textAlign: 'right', marginTop: 5 }}>Último km: {lastKm}</Text>
            </View>
            <InputWithIcon iconName="attach-money" placeholder="Valor" value={formData.value} onChangeText={(text: string) => handleChangeText('value', text)} />
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 15 }}>
              <Picker selectedValue={selectedIncomeType} onValueChange={setSelectedIncomeType}>
                <Picker.Item label="Selecione Tipo de Receita" value="" />
                <Picker.Item label="Salário" value="salario" />
                <Picker.Item label="Freelance" value="freelance" />
              </Picker>
            </View>
          </>
        );
      case 'Serviço':
      case 'Despesa':
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
              <InputWithIcon iconName="speed" placeholder="Odômetro" value={formData.odometer} onChangeText={(text: string) => handleChangeText('odometer', text)} />
              <Text style={{ fontSize: 10, color: '#666', textAlign: 'right', marginTop: 5 }}>Último km: {lastKm}</Text>
            </View>
            <InputWithIcon iconName="attach-money" placeholder="Valor" value={formData.value} onChangeText={(text: string) => handleChangeText('value', text)} />
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 15 }}>
              <Picker selectedValue={selectedServiceType} onValueChange={setSelectedServiceType}>
                <Picker.Item label="Selecione Tipo de Serviço" value="" />
                <Picker.Item label="Troca de Óleo" value="oleo" />
                <Picker.Item label="Revisão" value="revisao" />
              </Picker>
            </View>
            <InputWithIcon iconName="location-on" placeholder="Local" value={formData.location} onChangeText={(text: string) => handleChangeText('location', text)} />
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9' }}>
              <Picker selectedValue={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <Picker.Item label="Selecione Forma de Pagamento" value="" />
                <Picker.Item label="Dinheiro" value="dinheiro" />
                <Picker.Item label="Cartão" value="cartao" />
              </Picker>
            </View>
          </>
        );
      case 'Abastecimento':
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
              <InputWithIcon iconName="speed" placeholder="Odômetro" value={formData.odometer} onChangeText={(text: string) => handleChangeText('odometer', text)} />
              <Text style={{ fontSize: 10, color: '#666', textAlign: 'right', marginTop: 5 }}>Último km: {lastKm}</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 15 }}>
              <Picker selectedValue={selectedFuelType} onValueChange={setSelectedFuelType}>
                <Picker.Item label="Selecione Tipo de Combustível" value="" />
                <Picker.Item label="Gasolina" value="gasolina" />
                <Picker.Item label="Diesel" value="diesel" />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              <InputWithIcon iconName="local-gas-station" placeholder="Valor do Combustível" value={formData.fuelPrice} onChangeText={(text: string) => handleChangeText('fuelPrice', text)} />
              <InputWithIcon iconName="attach-money" placeholder="Valor Colocado" value={formData.value} onChangeText={(text: string) => handleChangeText('value', text)} />
              <InputWithIcon iconName="opacity" placeholder="Litros" value={formData.liters} onChangeText={(text: string) => handleChangeText('liters', text)} />
            </View>
            <InputWithIcon iconName="store" placeholder="Posto" value={formData.station} onChangeText={(text: string) => handleChangeText('station', text)} />
          </>
        );
      default:
        return fields.map((field) => (
          <InputWithIcon
            key={field.key}
            iconName="edit"
            placeholder={field.placeholder}
            value={formData[field.key]}
            onChangeText={(text: string) => handleChangeText(field.key, text)}
            keyboardType={field.keyboardType || 'default'}
            multiline={field.multiline || false}
            error={errors[field.key]}
          />
        ));
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f0f4f8' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' }}>Adicionar {type}</Text>
      {renderForm()}
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 3,
        }}
        onPress={handleSave}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Salvar no Histórico</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#007AFF', textAlign: 'center', fontSize: 16 }}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}