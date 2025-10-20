import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../services/api';
import { RootStackScreenProps } from '../types/navigation';
import { styles } from '../styles/AddVehicleScreen.styles';
import { useVehicle } from '../context/VehicleContext';

type Props = RootStackScreenProps<'AddVehicle'>;

interface VehicleData {
  placa: string;
  modelo: string;
  ano: string;
  tipo: 'carro' | 'moto';
  kmInicial: string;
}

const AddVehicleScreen: React.FC<Props> = () => {
  const navigation = useNavigation<Props['navigation']>();
  const { setSelectedVehicle } = useVehicle();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    placa: Yup.string()
      .required('Placa obrigatória')
      .matches(
        /^([A-Z]{3}-?\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/i,
        'Formato válido: ABC-1234, ABC1234 ou ABC1A23'
      ),
    modelo: Yup.string().required('Modelo obrigatório'),
    ano: Yup.number()
      .min(1900, 'Ano mínimo 1900')
      .max(new Date().getFullYear() + 1, 'Ano máximo futuro')
      .required('Ano obrigatório'),
    tipo: Yup.string()
      .oneOf(['carro', 'moto'], 'Tipo inválido')
      .required('Tipo obrigatório'),
    kmInicial: Yup.number()
      .min(0, 'KM inicial não pode ser negativo')
      .required('KM inicial obrigatório'),
  });

  const handleSubmit = async (values: VehicleData) => {
    if (loading) return;

    setLoading(true);
    try {
      const vehiclesCreate = await api.post('/vehicles', {
        placa: values.placa,
        modelo: values.modelo,
        ano: parseInt(values.ano, 10),
        tipo: values.tipo,
        kmInicial: parseInt(values.kmInicial, 10),
      });
      const createdVehicle = vehiclesCreate.data;
      setSelectedVehicle({
        id: createdVehicle.id,
        modelo: createdVehicle.modelo,
        placa: createdVehicle.placa,
      });
      navigation.navigate('History', { vehicleId: vehiclesCreate.data.id });
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Erro ao adicionar veículo. Tente novamente.';
      Alert.alert('Erro', message);
      console.error('Erro no POST /vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled 
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Adicionar Veículo</Text>

        <Formik
          initialValues={{ placa: '', modelo: '', ano: '', tipo: 'carro', kmInicial: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
            submitForm,
            isValid
          }) => {
            const hasErrors = Object.keys(errors).length > 0;
            const isFormValid = isValid && !hasErrors;

            return (
              <View style={styles.form}>
                {/* Placa */}
                <View style={styles.inputWrapper}>
                  <Ionicons name="car-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={[styles.input, (touched.placa && errors.placa) && styles.inputError]}
                    placeholder="Placa (ex: ABC-1234)"
                    value={values.placa}
                    onChangeText={handleChange('placa')}
                    onBlur={handleBlur('placa')}
                    maxLength={8}
                    returnKeyType="next"
                  />
                </View>
                {touched.placa && errors.placa && <Text style={styles.error}>{errors.placa}</Text>}

                {/* Modelo */}
                <View style={styles.inputWrapper}>
                  <Ionicons name="construct-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={[styles.input, (touched.modelo && errors.modelo) && styles.inputError]}
                    placeholder="Modelo (ex: Honda Civic)"
                    value={values.modelo}
                    onChangeText={handleChange('modelo')}
                    onBlur={handleBlur('modelo')}
                    returnKeyType="next"
                  />
                </View>
                {touched.modelo && errors.modelo && <Text style={styles.error}>{errors.modelo}</Text>}

                {/* Ano */}
                <View style={styles.inputWrapper}>
                  <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={[styles.input, (touched.ano && errors.ano) && styles.inputError]}
                    placeholder="Ano (ex: 2020)"
                    value={values.ano}
                    onChangeText={handleChange('ano')}
                    onBlur={handleBlur('ano')}
                    keyboardType="numeric"
                    maxLength={4}
                    returnKeyType="next"
                  />
                </View>
                {touched.ano && errors.ano && <Text style={styles.error}>{errors.ano}</Text>}

                {/* Tipo (Picker) */}
                <View style={styles.pickerWrapper}>
                  <Ionicons name="bicycle-outline" size={20} color="#666" style={styles.icon} />
                  <Picker
                    selectedValue={values.tipo}
                    onValueChange={(itemValue) => setFieldValue('tipo', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione o tipo" value="" />
                    <Picker.Item label="Carro" value="carro" />
                    <Picker.Item label="Moto" value="moto" />
                  </Picker>
                </View>
                {touched.tipo && errors.tipo && <Text style={styles.error}>{errors.tipo}</Text>}

                {/* KM Inicial */}
                <View style={styles.inputWrapper}>
                  <Ionicons name="speedometer-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={[styles.input, (touched.kmInicial && errors.kmInicial) && styles.inputError]}
                    placeholder="KM Inicial (ex: 0)"
                    value={values.kmInicial}
                    onChangeText={handleChange('kmInicial')}
                    onBlur={handleBlur('kmInicial')}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                {touched.kmInicial && errors.kmInicial && <Text style={styles.error}>{errors.kmInicial}</Text>}

                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    (!isFormValid || loading) && styles.submitButtonDisabled,
                  ]}
                  onPress={submitForm}
                  disabled={!isFormValid || loading}
                >
                  <Text style={styles.submitButtonText}>
                    {loading ? 'Adicionando...' : 'Adicionar Veículo'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default AddVehicleScreen;