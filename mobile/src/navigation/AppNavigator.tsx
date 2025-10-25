import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from "../utils/navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { VehicleProvider } from '../context/VehicleContext';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterForm from '../components/RegisterForm';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GlobalHeader from '../components/GlobalHeader';
import { styles } from '../styles/AppNavigator.styles';
import FormScreen from '../screens/FormScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {  
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const showTooltip = (text: string) => {
    setTooltipText(text);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000);
  };

  return ( 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          let tooltipText: string;
          switch (route.name) {
            case "History":
              iconName = "list-outline";
              tooltipText = "Histórico";
              break;
            case "Profile":
              iconName = "person-outline";
              tooltipText = "Perfil";
              break;
            default:
              iconName = "help-outline";
              tooltipText = "Ajuda";
          }
          return (
            <View style={styles.iconContainer}>
              <Icon
                name={iconName}
                size={size}
                color={color}
                onLongPress={() => showTooltip(tooltipText)}
              />
              {tooltipVisible && tooltipText === tooltipText && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>{tooltipText}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}; 

const AppNavigatorContent = () => {
  const { loading, initialRoute } = useAuth();
  const initialRouteName = initialRoute || 'Login';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando aplicação...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: true,
        header: () => <GlobalHeader />,
        headerStyle: { backgroundColor: '#00a8a8' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: true,
          header: () => <GlobalHeader />,
          title: 'Histórico de Despesas'
        }}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{
          headerShown: true,
          header: () => <GlobalHeader />,
          title: 'Adicionar Veículo'
        }}
      />
      <Stack.Screen
        name="FormScreen"
        component={FormScreen}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => (
  <AuthProvider>
    <VehicleProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigatorContent />
      </NavigationContainer>
    </VehicleProvider>
  </AuthProvider>
);

export default AppNavigator;