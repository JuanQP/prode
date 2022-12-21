import * as api from '@/helpers/api';
import { LoginData, LoginForm } from "@features/UI/LoginForm";
import { Button, Card, Group, Title } from "@mantine/core";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuth = useIsAuthenticated()
  const mutation = useMutation({ mutationFn: api.login })

  async function handleLoginSubmit(credentials: LoginData) {
    try {
      const response = await mutation.mutateAsync(credentials)
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
      console.error(error)
    }
  }

  if(isAuth()) {
    return <Navigate to="/" />
  }

  return (
    <Card p="lg" shadow="sm" sx={{ width: '100%' }}>
      <Title>Ingresar</Title>
      <LoginForm loading={mutation.isLoading} onSubmit={handleLoginSubmit}/>
      <Group grow mt="sm">
        <Button component={Link} variant='subtle' to="/">
          Volver a la página
        </Button>
        <Button component={Link} variant='subtle' to="/register">
          Crear cuenta
        </Button>
      </Group>
    </Card>
  )
}
