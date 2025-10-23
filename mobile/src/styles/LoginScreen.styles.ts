import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

// ---------------- Responsividade ----------------
const { width } = Dimensions.get('window');
export const isSmallScreen = width < 400;

// ---------------- Container ----------------
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
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
`;

export const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const Subtitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-bottom: 40px;
`;

// ---------------- Form ----------------
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
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

interface StyledTextInputProps {
  error?: boolean;
}

export const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  border-width: 1px;
  border-color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.muted};
  font-size: 20px;
`;

// ---------------- Checkbox ----------------
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
  color: ${({ theme }) => theme.colors.muted};
  margin-left: 8px;
`;

export const ForgotPassword = styled(TouchableOpacity)`
  padding: 5px;
`;

export const ForgotText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

// ---------------- Submit Button ----------------
export const SubmitButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.muted : theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

// ---------------- Divider ----------------
export const Divider = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const DividerLine = styled(View)`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const DividerText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  padding: 0 16px;
  text-transform: uppercase;
`;

// ---------------- Social Buttons ----------------
export const SocialButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SocialIcon = styled(Icon)`
  margin-right: 8px;
  font-size: 20px;
`;

export const SocialText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

// ---------------- Signup ----------------
export const SignupContainer = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

export const SignupText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const SignupLink = styled(TouchableOpacity)`
  margin-left: 5px;
`;

export const SignupLinkText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

// ---------------- Footer ----------------
export const Footer = styled(View)`
  position: absolute;
  bottom: 20px;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

export const FooterText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

export const FooterLink = styled(TouchableOpacity)`
  margin-left: 5px;
`;

export const FooterLinkText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`;

// ---------------- Timeline ----------------
interface LineProps {
  visible?: boolean;
}

export const TimelineContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 18px;
`;

export const TimelineLineTop = styled(View)<LineProps>`
  width: 2px;
  height: 18px;
  margin-bottom: 6px;
  background: ${({ visible }) => (visible ? '#bdbdbd' : 'transparent')};
`;

export const TimelineLineBottom = styled(View)`
  flex: 1;
  width: 2px;
  margin-top: 6px;
  background: ${({ theme }) => theme.colors.border};
`;

export const TimelineIconCircle = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  elevation: 2;
`;

export const TimelineContent = styled(View)`
  flex: 1;
  padding-left: 8px;
`;

export const TimelineTopRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TimelineTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const TimelineDateText = styled(Text)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const TimelineSubtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 6px;
`;

export const TimelineBottomRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`;

export const TimelineOdometer = styled(Text)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const TimelineAmount = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;
