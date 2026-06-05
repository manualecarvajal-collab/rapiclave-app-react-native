export const colors = {
  primary: '#0058bc',
  onPrimary: '#ffffff',
  primaryContainer: '#0070eb',
  onPrimaryContainer: '#fefcff',
  primaryFixed: '#d8e2ff',
  primaryFixedDim: '#adc6ff',
  secondary: '#006e28',
  onSecondary: '#ffffff',
  secondaryContainer: '#6ffb85',
  onSecondaryContainer: '#00732a',
  secondaryFixed: '#72fe88',
  secondaryFixedDim: '#53e16f',
  tertiary: '#bc000a',
  onTertiary: '#ffffff',
  tertiaryContainer: '#e2241f',
  tertiaryFixed: '#ffdad5',
  tertiaryFixedDim: '#ffb4aa',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  background: '#faf9fe',
  onBackground: '#1a1b1f',
  surface: '#faf9fe',
  onSurface: '#1a1b1f',
  surfaceVariant: '#e3e2e7',
  onSurfaceVariant: '#414755',
  surfaceDim: '#dad9df',
  surfaceBright: '#faf9fe',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f4f3f8',
  surfaceContainer: '#eeedf3',
  surfaceContainerHigh: '#e9e7ed',
  surfaceContainerHighest: '#e3e2e7',
  inverseSurface: '#2f3034',
  inverseOnSurface: '#f1f0f5',
  inversePrimary: '#adc6ff',
  outline: '#717786',
  outlineVariant: '#c1c6d7',
  surfaceTint: '#005bc1',
  labelPrimary: '#000000',
  labelSecondary: '#3C3C4399',
  separator: '#C6C6C8',
  systemBackground: '#FFFFFF',
  systemSecondaryBackground: '#F2F2F7',
  darkSystemBackground: '#1C1C1E',
  darkSystemSecondaryBackground: '#2C2C2E',
};

export const spacing = {
  marginMain: 16,
  sheetPadding: 20,
  stackGapMd: 16,
  gutterList: 12,
  stackGapSm: 8,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  largeTitle: 34,
  largeTitleMobile: 28,
  title: 20,
  headline: 17,
  body: 17,
  subheadline: 15,
  footnote: 13,
  caption: 12,
};

export const fontWeight = {
  largeTitle: '700' as const,
  largeTitleMobile: '700' as const,
  title: '700' as const,
  headline: '600' as const,
  body: '400' as const,
  bodyEmphasized: '600' as const,
  subheadline: '400' as const,
  footnote: '400' as const,
  caption: '400' as const,
};

export const lineHeight = {
  largeTitle: 41,
  largeTitleMobile: 34,
  title: 25,
  headline: 22,
  body: 22,
  subheadline: 20,
  footnote: 18,
  caption: 16,
};

export const letterSpacing = {
  largeTitle: 0.37,
  largeTitleMobile: 0,
  headline: -0.41,
  body: -0.41,
  subheadline: -0.24,
  footnote: -0.08,
  caption: 0,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
