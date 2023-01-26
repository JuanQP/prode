import { FinishMatchForm } from "@/features/Matches/FinishMatchForm";
import { finishMatch, FinishMatchValues, getMatch } from "@/helpers/matchesApi";
import { Button, Container, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

interface MutationParams {
  id: string;
  values: FinishMatchValues;
}

export function AdminMatchFinish() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) return <Navigate to="/" />

  const {data: match, ...query} = useQuery(['matches', id], {
    queryFn: () => getMatch(id),
    keepPreviousData: true,
  })
  const mutation = useMutation({
    mutationFn: ({ id, values }: MutationParams) => finishMatch(id, values),
    onSuccess: () => navigate(`/admin/competitions/${match?.competition}/`)
  })

  function handleSubmit(values: FinishMatchValues) {
    mutation.mutate({ id: String(id), values })
  }

  if(query.isLoading || !match) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Finalizar partido</Title>
        <Flex>
          <Button component={Link} to={`/admin/competitions/${match.competition}/`} leftIcon={<IconArrowBack />}>
            Competición
          </Button>
        </Flex>
        {match.status !== "Finalizado" ? null : (
          <Text>Este partido está Finalizado y su resultado no puede ser cambiado.</Text>
        )}
        <FinishMatchForm
          disabled={match.status === "Finalizado"}
          match={match}
          loading={query.isLoading || mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
