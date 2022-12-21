import { RegisterData, RegisterForm } from "@/features/UI/RegisterForm";
import * as api from "@/helpers/api";
import { Button, Card, Group, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export function Register() {

  const navigate = useNavigate()
  const mutation = useMutation({ mutationFn: api.register })

  async function handleSubmit(values: RegisterData) {
    try {
      const response = await mutation.mutateAsync(values)
      navigate('/register-ok', { state: { email: response.email }})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card p="lg" shadow="sm" sx={{ width: '100%' }}>
      <Title>Crear cuenta</Title>
      <Text>Creá tu cuenta para poder empezar a participar de las ligas de Prode 😀</Text>
      <RegisterForm loading={mutation.isLoading} onSubmit={handleSubmit} />
      <Group grow mt="sm">
        <Button component={Link} variant='subtle' to="/login">
          Ya tengo cuenta
        </Button>
        <Button component={Link} variant='subtle' to="/">
          Ir a la página
        </Button>
      </Group>
    </Card>
  )
}
