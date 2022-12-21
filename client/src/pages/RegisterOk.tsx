import footballImage from "@/assets/register_ok.svg";
import { Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link, Navigate, useLocation } from "react-router-dom";

export function RegisterOk() {

  const { state: { email }} = useLocation()

  if(typeof email !== "string") {
    return <Navigate to="/" />
  }

  return (
    <Card p="lg" shadow="sm" sx={{ width: '100%' }}>
      <Stack>
        <Title align="center">Todo listo! 👌</Title>
        <Image src={footballImage} />
        <Text align="center">
          ✅ Vas a poder ingresar a la app con el correo <Text span fw="bold">{email}</Text>
        </Text>
        <Text align="center">
          ⚽ Creá tu propia liga o unite a las ya existentes
        </Text>
        <Group grow>
          <Button variant="subtle" component={Link} to="/">
            Ir a la página
          </Button>
          <Button variant="subtle" component={Link} to="/login">
            Ingresar
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}
