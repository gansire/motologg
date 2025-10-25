import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation,NavigationProp  } from '@react-navigation/native';
import { styles } from '../styles/FloatingButtonModal.styles';
import { RootStackParamList } from '../types/navigation';

export default function FloatingButtonModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 

    const options = [
    {
      label: 'Lembrete',
      icon: 'event',
      type: 'Lembrete',
      fields: [
        { key: 'title', label: 'Título', placeholder: 'Título do lembrete', required: true },
        { key: 'description', label: 'Descrição', placeholder: 'Detalhes', multiline: true },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
      ],
    },
    {
      label: 'Receita',
      icon: 'attach-money',
      type: 'Receita',
      fields: [
        { key: 'value', label: 'Valor', placeholder: 'R$', required: true, keyboardType: 'numeric' as const },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
        { key: 'description', label: 'Descrição', placeholder: 'Fonte da receita', required: true },
        { key: 'category', label: 'Categoria', placeholder: 'Ex.: Salário' },
      ],
    },
    {
      label: 'Serviço',
      icon: 'build',
      type: 'Serviço',
      fields: [
        { key: 'value', label: 'Valor', placeholder: 'R$', required: true, keyboardType: 'numeric' as const },
        { key: 'description', label: 'Descrição', placeholder: 'Tipo de serviço', required: true },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
        { key: 'provider', label: 'Prestador', placeholder: 'Nome do prestador' },
      ],
    },
    {
      label: 'Despesa',
      icon: 'money-off',
      type: 'Despesa',
      fields: [
        { key: 'value', label: 'Valor', placeholder: 'R$', required: true, keyboardType: 'numeric' as const },
        { key: 'description', label: 'Descrição', placeholder: 'Motivo da despesa', required: true },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
        { key: 'category', label: 'Categoria', placeholder: 'Ex.: Alimentação' },
      ],
    },
    {
      label: 'Abastecimento',
      icon: 'local-gas-station',
      type: 'Abastecimento',
      fields: [
        { key: 'value', label: 'Valor', placeholder: 'R$', required: true, keyboardType: 'numeric' as const },
        { key: 'liters', label: 'Litros', placeholder: 'Litros abastecidos', keyboardType: 'numeric' as const },
        { key: 'km', label: 'Km Rodados', placeholder: 'Km atuais', keyboardType: 'numeric' as const },
        { key: 'description', label: 'Descrição', placeholder: 'Posto ou detalhes' },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
      ],
    },
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
                  navigation.navigate('FormScreen', { type: option.type, fields: option.fields });
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