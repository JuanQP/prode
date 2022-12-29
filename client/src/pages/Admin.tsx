import { CardButton } from "@/features/Admin/CardButton";
import { getCurrentUser } from "@/helpers/api";
import { Container, Grid, Loader, Stack, Title } from "@mantine/core";
import { IconShirt, IconTrophy } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

interface Props {

}

export function Admin(props: Props) {

  const { data: user, isLoading } = useQuery(['users', 'me'], {
    queryFn: getCurrentUser,
    keepPreviousData: true,
  })

  if(isLoading) return <Loader />

  if(!user?.is_staff) {
    console.error("No tenés permisos para ver esta página")
    return <Navigate to="/" />
  }

  return (
    <Container pt="md">
      <Stack>
        <Title>Administración</Title>
        <Grid>
          <Grid.Col xs={12} md={6}>
            <CardButton
              title="Competiciones"
              subtitle="Las competiciones se usan como base para crear Ligas"
              Icon={IconTrophy}
              to="/admin/competitions"
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <CardButton
              title="Equipos"
              subtitle="Equipos de fútbol que componen los Partidos"
              Icon={IconShirt}
              to="/admin/teams"
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}
