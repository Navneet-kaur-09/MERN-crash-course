'use client'
//import extendTheme from '@chakra-ui/react';
import customTheme from '../theme'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
export default Provider;
