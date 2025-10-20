import React, { useState } from 'react';
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform, 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

interface RegisterData {
  name: string;
  email: string;
  password: string;
}
const Container = View;
const Title = Text;
const Input = TextInput;
const Button = TouchableOpacity;
const ButtonText = Text;
const ErrorMessage = Text;
const LinkText = Text;

const RegisterForm: React.FC<Props> = ({ navigation }) => {  
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (name: keyof RegisterData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setError(''); 
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      Alert.alert('Sucesso', 'Registro realizado! Redirecionando para login...');

      navigation.navigate('Login');

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao registrar. Tente novamente.';
      console.error('Erro no registro:', err);
      setError(errorMessage);
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Title style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Registro</Title>
      
      <Input
        placeholder="Nome completo"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
        editable={!loading}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 4 }}
      />
      
      <Input
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        editable={!loading}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 4 }}
      />
      
      <Input
        placeholder="Senha (mín. 6 chars)"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        editable={!loading}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 4 }}
      />
      
      {error ? <ErrorMessage style={{ color: 'red', textAlign: 'center' }}>{error}</ErrorMessage> : null}
      
      <Button onPress={handleSubmit} disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '#007bff', padding: 12, borderRadius: 4, alignItems: 'center' }}>
        <ButtonText style={{ color: 'white', fontWeight: 'bold' }}>
          {loading ? 'Registrando...' : 'Registrar'}
        </ButtonText>
      </Button>
      
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <LinkText onPress={goToLogin} style={{ color: '#007bff' }}>Já tem conta? Faça login</LinkText>
      </View>
    </Container>
  );
};

export default RegisterForm;