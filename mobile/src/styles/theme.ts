export interface CustomTheme {
  colors: {
    primary: string;
    error: string;
    success: string;
    text: string;
    muted: string;
    border: string;
    background: string;
    backgroundInput: string;
  };
}

const theme: CustomTheme = {
  colors: {
    primary: '#3b82f6',
    error: '#dc3545',
    success: '#28a745',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#d1d5db',
    background: '#f8fafc',
    backgroundInput: '#ffffff',
  },
};

export default theme;