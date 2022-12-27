import * as api from '@/helpers/api'
import { router } from '@/routes'
import "@fontsource/comfortaa"
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { AuthProvider } from 'react-auth-kit'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { theme } from './theme'

const queryClient = new QueryClient()

const token = localStorage.getItem('_auth')
if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authType='localstorage' authName='_auth' refresh={api.refreshApi}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>,
)
