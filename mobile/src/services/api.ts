import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../utils/navigation';

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigate("Login");
    }
    return Promise.reject(error);
  }
);

export default api;