import { createSystem, defaultConfig } from '@chakra-ui/react';

const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          100: '#f7fafc',
          900: '#1a202c',
        },
      },
    },
  },
});

export default customTheme;
