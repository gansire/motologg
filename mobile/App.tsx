import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/styles/theme';
import { AuthProvider } from './src/context/AuthContext';
import { VehicleProvider } from './src/context/VehicleContext';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <VehicleProvider>
            <AppNavigator />
          </VehicleProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
