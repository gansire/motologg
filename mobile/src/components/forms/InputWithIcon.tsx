import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputWithIconProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
  multiline?: boolean;
  error?: string;
}

export default function InputWithIcon({ iconName, placeholder, value, onChangeText, keyboardType = 'default', multiline = false, error }: InputWithIconProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: error ? '#ff0000' : '#ddd', borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#f9f9f9' }}>
      <Icon name={iconName} size={20} color="#007AFF" style={{ marginRight: 10 }} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
      />
    </View>
  );
}