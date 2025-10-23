import 'styled-components/native';
import { CustomTheme } from '../styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {}
}