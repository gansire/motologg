import { KeyboardTypeOptions } from 'react-native';
export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
}