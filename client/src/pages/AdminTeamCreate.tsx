import { TeamForm } from "@/features/Teams/TeamForm";
import { createTeam } from "@/helpers/teamsApi";
import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export function AdminTeamCreate() {

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => navigate('/admin/teams')
  })

  function handleSubmit(values: Team) {
    mutation.mutate(values)
  }

  return (
    <Container pt="md">
      <Stack>
        <Title>Crear equipo</Title>
        <Flex>
          <Button component={Link} to="/admin/teams" leftIcon={<IconArrowBack />}>
            Equipos
          </Button>
        </Flex>
        <TeamForm
          editing={true}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
