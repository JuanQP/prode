import * as api from '@/helpers/api'
import { LOCAL_STORAGE_JWT_NAME } from '@/helpers/axios'
import { router } from '@/routes'
import "@fontsource/comfortaa"
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { AuthProvider } from 'react-auth-kit'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { theme } from './theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authType='localstorage' authName={LOCAL_STORAGE_JWT_NAME} refresh={api.refreshApi}>
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
