import 'styled-components/native'; 
import { CustomTheme } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {}
}