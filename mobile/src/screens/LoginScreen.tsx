import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

import {
  Container,
  ContentWrapper,
  LogoContainer,
  LogoIcon,
  Title,
  Subtitle,
  Form,
  InputContainer,
  Label,
  StyledTextInput,
  PasswordContainer,
  PasswordEye,
  EyeIcon,
  CheckboxContainer,
  CheckboxText,
  ForgotPassword,
  ForgotText,
  SubmitButton,
  ButtonText,
  Divider,
  DividerLine,
  DividerText,
  SignupContainer,
  SignupText,
  SignupLinkText, 
} from '../styles/LoginScreen.styles';
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {login} = useAuth();

  const handleInputChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.post(
        "/auth/login", 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { access_token: token, user } = response.data;
      await login(token, user);

      Alert.alert('Sucesso', 'Login realizado!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro no login. Tente novamente.';
      console.error('Erro no login:', err);
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Container
      colors={['#eff6ff', '#ffffff', '#f0fdf4']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ContentWrapper>
        <LogoContainer>
          <LogoIcon name="bicycle" size={32} />
          <Title>MotoLog</Title>
        </LogoContainer>

        <Subtitle>Organize suas finanças como um profissional</Subtitle>

        <Form>
          <InputContainer>
            <Label>Email</Label>
            <StyledTextInput
              placeholder="seu@email.com"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </InputContainer>

          <InputContainer>
            <Label>Senha</Label>
            <PasswordContainer>
              <StyledTextInput
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <PasswordEye onPress={togglePasswordVisibility}>
                <EyeIcon name={showPassword ? 'eye-off' : 'eye'} />
              </PasswordEye>
            </PasswordContainer>
          </InputContainer>

          <CheckboxContainer>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <Icon
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={20}
                color="#3b82f6"
              />
              <CheckboxText>Lembrar de mim</CheckboxText>
            </TouchableOpacity>
            <ForgotPassword onPress={() => Alert.alert('Recuperação', 'Em breve!')}>
              <ForgotText>Esqueceu a senha?</ForgotText>
            </ForgotPassword>
          </CheckboxContainer>

          <SubmitButton onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color="#ffffff" />
                <ButtonText>Entrando...</ButtonText>
              </>
            ) : (
              <ButtonText>Entrar</ButtonText>
            )}
          </SubmitButton>
        </Form>

        {/* Divisor */}
        <Divider>
          <DividerLine />
          <DividerText>ou</DividerText>
          <DividerLine />
        </Divider>

        {/* Botões Sociais */}
        {/* <SocialButton onPress={() => Alert.alert('Google', 'Login com Google em breve!')}>
          <SocialIcon name="logo-google" color="#db4437" />
          <SocialText>Google</SocialText>
        </SocialButton>

        <SocialButton onPress={() => Alert.alert('Facebook', 'Login com Facebook em breve!')}>
          <SocialIcon name="logo-facebook" color="#1877f2" />
          <SocialText>Facebook</SocialText>
        </SocialButton> */}

        {/* Cadastro */}
        <SignupContainer>
          <SignupText>Não tem uma conta? </SignupText>
          <TouchableOpacity onPress={goToRegister}>
            <SignupLinkText>Cadastre-se gratuitamente</SignupLinkText>
          </TouchableOpacity>
        </SignupContainer>
      </ContentWrapper>
    </Container>
  );
}