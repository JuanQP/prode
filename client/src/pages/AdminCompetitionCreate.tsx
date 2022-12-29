import { CompetitionForm } from "@/features/Competitions/CompetitionForm";
import { createCompetition } from "@/helpers/competitionsApi";
import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

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
        <Flex>
          <Button component={Link} to="/admin/competitions" leftIcon={<IconArrowBack />}>
            Competiciones
          </Button>
        </Flex>
        <CompetitionForm
          editing={true}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
