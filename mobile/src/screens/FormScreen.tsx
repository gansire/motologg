import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import ReminderForm from '../components/forms/ReminderForm';
import IncomeForm from '../components/forms/IncomeForm';
import ServiceExpenseForm from '../components/forms/ServiceExpenseForm';
import FuelForm from '../components/forms/FuelForm';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'FormScreen'>;

export default function FormScreen() {
  const navigation = useNavigation();
  const route = useRoute<FormScreenRouteProp>();
  const { type, fields } = route.params;

  // Estados compartilhados (pode mover para um hook se necessário)
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

  const handleSave = () => {
    // Lógica de salvamento (igual ao original)
    console.log('Dados salvos:', { type, ...formData, ...selectedValues });
    navigation.goBack();
  };

  const renderForm = () => {
    const commonProps = { formData, setFormData, errors, setErrors, selectedValues, setSelectedValues };
    switch (type) {
      case 'Lembrete': return <ReminderForm {...commonProps} />;
      case 'Receita': return <IncomeForm {...commonProps} />;
      case 'Serviço':
      case 'Despesa': return <ServiceExpenseForm {...commonProps} type={type} />;
      case 'Abastecimento': return <FuelForm {...commonProps} />;
      default: return <Text>Formulário não encontrado</Text>;
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f0f4f8' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' }}>Adicionar {type}</Text>
      {renderForm()}
      <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginBottom: 10 }} onPress={handleSave}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: '#007AFF', textAlign: 'center' }}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}