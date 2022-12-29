import { MatchForm } from "@/features/Matches/MatchForm";
import { getCompetitions } from "@/helpers/competitionsApi";
import { createMatch, MatchUpdateValues } from "@/helpers/matchesApi";
import { getTeams } from "@/helpers/teamsApi";
import { Button, Container, Flex, Loader, Stack, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export function AdminMatchCreate() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) return <Navigate to="/" />

  const { data: competitions, ...competitionsQuery } = useQuery(["competitions"], {
    queryFn: getCompetitions,
    initialData: [],
  })
  const { data: teams, ...teamsQuery } = useQuery(["teams"], {
    queryFn: getTeams,
    initialData: [],
  })
  const mutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => navigate(`/admin/competitions/${id}`)
  })

  function handleSubmit(values: Omit<MatchUpdateValues, "competition">) {
    mutation.mutate({
      ...values,
      competition: Number(id),
    })
  }

  if(competitionsQuery.isLoading || teamsQuery.isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Crear partido</Title>
        <Flex>
          <Button component={Link} to={`/admin/competitions/${id}/`} leftIcon={<IconArrowBack />}>
            Competición
          </Button>
        </Flex>
        <MatchForm
          competitionId={Number(id)}
          competitions={competitions}
          teams={teams}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
