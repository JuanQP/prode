import { TeamForm } from "@/features/Teams/TeamForm";
import { createTeam } from "@/helpers/teamsApi";
import { Container, Stack, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
        <TeamForm
          editing={true}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
