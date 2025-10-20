import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { useVehicle } from '../context/VehicleContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from '../styles/GlobalHeader.styles';

export default function GlobalHeader() {
  const { selectedVehicle, setSelectedVehicle, vehicles, fetchVehicles } = useVehicle();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openSelector = () => {
    if (Platform.OS === "ios") {
      const options = vehicles.map((v) => `${v.modelo} - ${v.placa}`);
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options, "Cancelar"],
          cancelButtonIndex: options.length,
        },
        (buttonIndex) => {
          if (buttonIndex < options.length) {
            setSelectedVehicle(vehicles[buttonIndex]);
          }
        }
      );
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={openSelector}>
        <Text style={styles.text}>
          {selectedVehicle
            ? `${selectedVehicle.modelo} - ${selectedVehicle.placa}`
            : "Nenhum veículo selecionado"}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Android */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.placa}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelectedVehicle(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {item.modelo} - {item.placa}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}