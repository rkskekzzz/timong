declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      mode: string;
      foregroundHeader: string;
      backgroundHeader: string;
      backgroundModal: string;
      backDropHeader: string;
      foreground: string;
      iconSmall: string;
      icon: string;
      foregroundSwitch: string;
      backgroundSwitch: string;
      foregroundAddButton: string;
      backgroundAddButton: string;
      backDrop: string;
      background: string;
      border: string;
    };
    main: {
      background: string;
      theme: string;
    };
  }
  interface ThemeOptions {
    myPalette?: {
      mode?: string;
      foregroundHeader?: string;
      backgroundHeader?: string;
      backgroundModal?: string;
      backDropHeader?: string;
      foreground?: string;
      iconSmall?: string;
      icon?: string;
      foregroundSwitch?: string;
      backgroundSwitch?: string;
      foregroundAddButton?: string;
      backgroundAddButton?: string;
      backDrop?: string;
      background?: string;
      border?: string;
    };
    main: {
      background?: string;
      theme?: string;
    };
  }
}

export const themes = {
  light: {
    mode: 'light',
    foregroundHeader: '#6a6a6a',
    backgroundHeader: 'linear-gradient(#f2f2f2, #f2f2f2,#f2f2f2dd);',
    backgroundModal: '#ffffff',
    backDropHeader: '#ffffffdd',
    foreground: '#000000',
    iconSmall: '#000000',
    icon: '#171717',
    foregroundSwitch: '#1a1a1adf',
    backgroundSwitch: '#fafafadf',
    foregroundAddButton: '#ffffff',
    backgroundAddButton: '#000000',
    backDrop: '#00000080',
    background: '#ffffff',
    border: '#888888',
  },
  dark: {
    mode: 'dark',
    foregroundHeader: '#f2f2f2',
    backgroundHeader: 'linear-gradient(#1a1a1a, #1a1a1a,#1a1a1add);',
    backgroundModal: '#303030',
    backDropHeader: '#000000b0',
    foreground: '#dadada',
    iconSmall: '#f2f2f2',
    icon: '#ffffff',
    foregroundSwitch: '#fafafadf',
    backgroundSwitch: '#212121df',
    foregroundAddButton: '#000000',
    backgroundAddButton: '#ffffff',
    backDrop: '#000000b0',
    background: '#131313',
    border: '#888888',
  },
  main: {
    background: '#ffd8fb',
    theme: '#f995f0',
  },
};
