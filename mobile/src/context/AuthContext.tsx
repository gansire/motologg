// AuthContext.tsx (versão corrigida com tipos restritos)
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../utils/navigation';
import { RootStackParamList } from '../types/navigation'; // Importe o tipo (ajuste caminho)

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  initialRoute: keyof RootStackParamList | null; // CORRIGIDO: Tipo restrito às chaves do stack
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser ] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null); // CORRIGIDO: Tipo restrito

  useEffect(() => {
    const loadUser  = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedUser  = await AsyncStorage.getItem('user');

        if (savedToken && savedUser ) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setToken(savedToken);
            setUser (parsedUser );
            setInitialRoute('MainTabs' as keyof RootStackParamList); 
          } catch (parseErr) {
            await AsyncStorage.removeItem('user'); 
            setInitialRoute('Login' as keyof RootStackParamList);
          }
        } else {
          setInitialRoute('Login' as keyof RootStackParamList); 
        }
      } catch (err) {
        setInitialRoute('Login' as keyof RootStackParamList);
      } finally {
        setLoading(false);
      }
    };
    loadUser ();
  }, []);

  const login = async (newToken: string, newUser:User) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser ));
      setToken(newToken);
      setUser (newUser );

      setInitialRoute('MainTabs' as keyof RootStackParamList);
      setTimeout(() => navigate('MainTabs'), 100);
    } catch (err) {
      console.error('Erro no login:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser (null);
      setInitialRoute('Login' as keyof RootStackParamList);
      navigate('Login');
    } catch (err) {
      console.error('Erro no logout:', err);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    initialRoute,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};