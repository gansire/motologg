import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/FloatingButtonModal.styles';

export default function FloatingButtonModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); 

  const options = [
    // { label: 'Lembrete', icon: 'event', route: 'FuelScreen' },
    // { label: 'Receita', icon: 'attach-money', },
    // { label: 'Serviço', icon: 'build',},
    // { label: 'Despesa', icon: 'money-off' },
    { label: 'Abastecimento', icon: 'local-gas-station', route: 'FuelScreen'},
  ];

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity 
                key={option.label} 
                style={styles.optionButton}
                onPress={() => {
                  navigation.navigate(option.route as never);
                  setModalVisible(false);
                }}
              >
                <Icon name={option.icon} size={24} color="#007AFF" style={{ marginRight: 10 }} />
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}