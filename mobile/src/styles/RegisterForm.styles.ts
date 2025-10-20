import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  
import Icon from 'react-native-vector-icons/Ionicons';

const colors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  error: '#ef4444',
  background: '#f8fafc',
  text: '#1f2937',
  border: '#d1d5db',
  shadow: '#000',
  gray: '#9ca3af',
};

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const GradientBackground = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const FormContainer = styled.View`
  width: 100%;
  max-width: 400px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  shadowColor: ${colors.shadow};
  shadowOffset: 0px 4px;
  shadowOpacity: 0.1;
  shadowRadius: 8px;
  elevation: 8;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 12px;
  padding: 0 15px;
  border-width: 1px;
  border-color: ${colors.border};
  shadowColor: ${colors.shadow};
  shadowOffset: 0px 2px;
  shadowOpacity: 0.05;
  shadowRadius: 4px;
  elevation: 2;
`;

export const InputIcon = styled(Icon)`
  color: ${colors.primary};
  margin-right: 10px;
  font-size: 20px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 15px;
  font-size: 16px;
  color: ${colors.text};
  border-radius: 12px;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.error};
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const SubmitButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 12px;
  padding: 0;
  margin-top: 10px;
  overflow: hidden;
  ${({ disabled }) =>
    !disabled &&
    `
    shadowColor: ${colors.shadow};
    shadowOffset: 0px 4px;
    shadowOpacity: 0.2;
    shadowRadius: 8px;
    elevation: 4;
  `}
`;

export const GradientButtonContent = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const LinkContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  text-decoration-line: underline;
`;

export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  color: white;
`;
