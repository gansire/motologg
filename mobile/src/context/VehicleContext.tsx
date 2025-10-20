import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

export type Vehicle = {
  id: string;
  modelo: string;
  placa: string;
  tipo?: string;
  ano?: number;
};

type VehicleContextType = {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
  fetchVehicles: () => Promise<void>;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  const fetchVehicles = async () => {
    if (!token) return;
    try {
      const response = await api.get('/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err: any) {
      console.error('Erro ao carregar veículos:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchVehicles();
  }, [token]);

  return (
    <VehicleContext.Provider value={{ vehicles, selectedVehicle, setSelectedVehicle, setVehicles, fetchVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) throw new Error('useVehicle must ser usado dentro de VehicleProvider');
  return context;
};
