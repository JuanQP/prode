import * as api from '@/helpers/api';
import { LoginData, LoginForm } from "@features/UI/LoginForm";
import { Card, Title } from "@mantine/core";
import axios from "axios";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuth = useIsAuthenticated()

  async function handleLoginSubmit(credentials: LoginData) {
    try {
      const response = await api.login(credentials)
      signIn({
        token: response.access,
        refreshToken: response.refresh,
        refreshTokenExpireIn: 1440,
        tokenType: 'Bearer',
        expiresIn: 5,
        authState: {},
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.access}`
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  if(isAuth()) {
    return <Navigate to="/" />
  }

  return (
    <Card shadow="sm" sx={{ width: '100%' }}>
      <Title>Ingresar</Title>
      <LoginForm onSubmit={handleLoginSubmit}/>
    </Card>
  )
}
