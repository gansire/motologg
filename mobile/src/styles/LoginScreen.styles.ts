import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from './theme';

// Dimensões da tela para responsividade
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 400;

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
`;


export const ContentWrapper = styled(View)`
  width: 100%;
  max-width: 400px;
  align-items: center;
`;

export const LogoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 10px;
`;

export const LogoIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary || '#3cb82f6'};
  margin-right: 10px;
`;

export const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text || '#1f2937'};
  margin-bottom: 8px;
`;

export const Subtitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  text-align: center;
  margin-bottom: 40px;
`;

export const Form = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;

export const InputContainer = styled(View)`
  margin-bottom: 20px;
`;

export const Label = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || '#1f2937'};
  margin-bottom: 8px;
`;

export const StyledTextInput = styled(TextInput)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundInput || '#ffffff'};
  color: ${({ theme }) => theme.colors.text || '#1f2937'};
`;

export const PasswordContainer = styled(View)`
  position: relative;
  margin-bottom: 20px;
`;

export const PasswordEye = styled(TouchableOpacity)`
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -12px;
  padding: 5px;
`;

export const EyeIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  font-size: 20px;
`;

export const CheckboxContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Checkbox = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  margin-left: 8px;
`;

export const ForgotPassword = styled(TouchableOpacity)`
  padding: 5px;
`;

export const ForgotText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary || '#3b82f6'};
`;

export const SubmitButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? (theme.colors.muted || '#9ca3af') : (theme.colors.primary || '#3b82f6')};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

export const Divider = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const DividerLine = styled(View)`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border || '#d1d5db'};
`;

export const DividerText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  padding: 0 16px;
  text-transform: uppercase;
`;

export const SocialButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background || '#ffffff'};
`;

export const SocialIcon = styled(Icon)`
  margin-right: 8px;
  font-size: 20px;
`;

export const SocialText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text || '#1f2937'};
`;

export const SignupContainer = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

export const SignupText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
`;

export const SignupLink = styled(TouchableOpacity)`
  margin-left: 5px;
`;

export const SignupLinkText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary || '#3b82f6'};
  font-weight: 600;
`;

export const Footer = styled(View)`
  position: absolute;
  bottom: 20px;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

export const FooterText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  text-align: center;
`;

export const FooterLink = styled(TouchableOpacity)`
  margin-left: 5px;
`;

export const FooterLinkText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary || '#3b82f6'};
`;