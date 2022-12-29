import { CompetitionForm } from "@/features/Competitions/CompetitionForm";
import { createCompetition } from "@/helpers/competitionsApi";
import { Container, Stack, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function AdminCompetitionCreate() {

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createCompetition,
    onSuccess: () => navigate('/admin/competitions')
  })

  function handleSubmit(values: Pick<Competition, "name">) {
    mutation.mutate(values)
  }

  return (
    <Container pt="md">
      <Stack>
        <Title>Crear competición</Title>
        <CompetitionForm
          editing={true}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
