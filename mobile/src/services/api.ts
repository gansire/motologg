import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../utils/navigation';
import { Platform } from 'react-native';

const HOST_IP = '192.168.18.81'; 

const getBaseURL = (): string => {
  if (Platform.OS === 'android') {
    return __DEV__ ? 'http://10.0.2.2:3000' : `http://${HOST_IP}:3000`;
  } else {
    return __DEV__ ? 'http://localhost:3000' : `http://${HOST_IP}:3000`;
  }
};

const api = axios.create({
  baseURL: 'https://ddc3089f6f4d.ngrok-free.app',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Erro na API:', error.message); // Adicionei log para debug
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigate("Login");
    }
    return Promise.reject(error);
  }
);

export default api;