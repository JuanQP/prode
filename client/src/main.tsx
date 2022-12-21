import * as api from '@/helpers/api'
import { router } from '@/routes'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { AuthProvider } from 'react-auth-kit'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'

const queryClient = new QueryClient()

const token = localStorage.getItem('_auth')
if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <AuthProvider authType='localstorage' authName='_auth' refresh={api.refreshApi}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
)
