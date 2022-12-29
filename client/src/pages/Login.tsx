import loginImage from "@/assets/login.svg";
import * as api from '@/helpers/api';
import { LoginData, LoginForm } from "@features/UI/LoginForm";
import { Button, Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import { useMutation } from '@tanstack/react-query';
import jwtDecode from "jwt-decode";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Link, Navigate, useLocation } from "react-router-dom";

export function Login() {
  const signIn = useSignIn()
  const isAuth = useIsAuthenticated()
  const mutation = useMutation({ mutationFn: api.login })
  const location = useLocation()
  const redirectUrl: string | undefined = location.state?.from?.pathname

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
    } catch (error) {
      console.error(error)
    }
  }

  if(isAuth()) {
    return <Navigate to={redirectUrl ?? '/'} />
  }

  return (
    <Card p="lg" shadow="sm" sx={{ width: '100%' }}>
      <Grid>
        <Grid.Col xs={12} md={6}>
          <Image src={loginImage} />
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <Title>Ingresar a Prode</Title>
          {!redirectUrl ? null : (
            <Text color="dimmed">Redirigiendo a {redirectUrl}</Text>
          )}
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
