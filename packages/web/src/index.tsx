import { ChakraProvider, ColorModeScript, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './Ws';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark', // 'dark' | 'light'
  useSystemColorMode: true,
}
const container = document.getElementById('app');
const root = createRoot(container);
const theme = extendTheme({ config })

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
