import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { Provider } from '@chakra-ui/react';
import { Provider } from "@/components/ui/provider"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { useProductStore } from './store/product.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider> 
      <App /> 
      </Provider>
      </BrowserRouter>
  </StrictMode>,
)
