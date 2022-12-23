import loginImage from "@/assets/login.svg";
import * as api from '@/helpers/api';
import { LoginData, LoginForm } from "@features/UI/LoginForm";
import { Button, Card, Grid, Group, Image, Title } from "@mantine/core";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import jwtDecode from "jwt-decode";
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
      const decodedJwt = jwtDecode<DecodedJWT>(response.access)
      signIn({
        token: response.access,
        refreshToken: response.refresh,
        refreshTokenExpireIn: 1440,
        tokenType: 'Bearer',
        expiresIn: 5,
        authState: {
          user: decodedJwt.user,
        },
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
      <Grid>
        <Grid.Col xs={12} md={6}>
          <Image src={loginImage} />
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <Title>Ingresar a Prode</Title>
          <LoginForm loading={mutation.isLoading} onSubmit={handleLoginSubmit}/>
          <Group grow mt="sm">
            <Button component={Link} variant='subtle' to="/">
              Ir al Home
            </Button>
            <Button component={Link} variant='subtle' to="/register">
              Crear cuenta
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
