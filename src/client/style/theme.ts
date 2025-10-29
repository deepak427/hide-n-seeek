export const Theme = {
  // Apple Arcade inspired colors
  bgDark: 0x1a1a2e,
  bgLight: 0x16213e,
  bgGradient: 0x0f3460,
  accent: 0x00d4ff,
  accentSecondary: 0xff6b6b,
  text: 0xffffff,
  textSecondary: 0xe0e6ed,
  success: 0x4ecdc4,
  warning: 0xffe66d,

  // Apple Arcade style gradients and effects
  gradients: {
    primary: [0x1a1a2e, 0x16213e, 0x0f3460],
    accent: [0x00d4ff, 0x0099cc],
    button: [0x00d4ff, 0x0088bb],
    card: [0x2a2a3e, 0x1a1a2e],
  },

  // RGB arrays for Phaser tinting or CSS
  rgb: {
    bgDark: [26, 26, 46],
    bgLight: [22, 33, 62],
    bgGradient: [15, 52, 96],
    accent: [0, 212, 255],
    accentSecondary: [255, 107, 107],
    text: [255, 255, 255],
    textSecondary: [224, 230, 237],
    success: [78, 205, 196],
    warning: [255, 230, 109],
  },

  // Typography scale for responsive design
  typography: {
    title: { base: 48, mobile: 32 },
    heading: { base: 36, mobile: 24 },
    body: { base: 24, mobile: 18 },
    button: { base: 28, mobile: 20 },
  },

  // Spacing and layout
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Border radius for Apple Arcade style
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
