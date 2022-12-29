import { AdminGenericList } from "@/features/UI/AdminGenericList";
import { deleteTeam, getTeams } from "@/helpers/teamsApi";
import { Button, Container, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack, IconFileUpload, IconPlus } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Props {

}

export function AdminTeams(props: Props) {

  const queryClient = useQueryClient()
  const { data: teams, isLoading } = useQuery(['teams'], {
    queryFn: getTeams,
    keepPreviousData: true,
    initialData: [],
  })
  const mutation = useMutation(deleteTeam, {
    onSuccess: () => queryClient.invalidateQueries(['teams'])
  })

  function handleDelete(team: Team) {
    if(confirm(`¿Estás seguro de borrar el equipo ${team.name}?`)) {
      mutation.mutate(String(team.id))
    }
  }

  if(isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Equipos</Title>
        <Text color="dimmed">Todos los equipos de fútbol</Text>
        <Flex gap="sm">
          <Button component={Link} to="/admin/teams/create" color="green" leftIcon={<IconPlus />}>
            Nuevo
          </Button>
          <Button component={Link} to="/admin/teams/file-upload" color="green" leftIcon={<IconFileUpload />}>
            Importar equipos
          </Button>
          <Button component={Link} to="/admin/" leftIcon={<IconArrowBack />}>
            Admin
          </Button>
        </Flex>
        <AdminGenericList
          idField="id"
          headers={["ID", "Nombre", "Nombre corto"]}
          columns={["id", "name", "short_name"]}
          route="/admin/teams"
          items={teams}
          onDelete={handleDelete}
        />
      </Stack>
    </Container>
  )
}
