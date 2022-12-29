import { AdminGenericList } from "@/features/UI/AdminGenericList";
import { deleteCompetition, getCompetitions } from "@/helpers/competitionsApi";
import { Button, Container, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack, IconPlus } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function AdminCompetitions() {

  const queryClient = useQueryClient()
  const { data: competitions, isLoading } = useQuery(['competitions'], {
    queryFn: getCompetitions,
    keepPreviousData: true,
    initialData: [],
  })
  const mutation = useMutation(deleteCompetition, {
    onSuccess: () => queryClient.invalidateQueries(['competitions'])
  })

  function handleDelete(competition: Competition) {
    if(confirm(`¿Estás seguro de borrar la competición ${competition.name}?`)) {
      mutation.mutate(String(competition.id))
    }
  }

  if(isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Competiciones</Title>
        <Text color="dimmed">Todas las competiciones</Text>
        <Flex gap="sm">
          <Button component={Link} to="/admin/competitions/create" color="green" leftIcon={<IconPlus />}>
            Nuevo
          </Button>
          <Button component={Link} to="/admin/" leftIcon={<IconArrowBack />}>
            Admin
          </Button>
        </Flex>
        <AdminGenericList
          idField="id"
          headers={["Nombre", "Partidos"]}
          columns={["name", "match_count"]}
          route="/admin/competitions"
          items={competitions}
          onDelete={handleDelete}
        />
      </Stack>
    </Container>
  )
}
