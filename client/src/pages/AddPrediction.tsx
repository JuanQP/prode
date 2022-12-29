import { PredictionForm } from "@/features/Predictions/PredictionForm";
import { getError } from "@/helpers/getError";
import { addPrediction, getLeague, getLeagueNextMatches } from "@/helpers/leaguesApi";
import { Alert, Button, Container, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

interface AddPrediction {
  id: string;
  data: AddPredictionData;
}

export function AddPrediction() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) {
    return <Navigate to={`/competitions/`} />
  }

  const { isError, isLoading, data: league } = useQuery(["leagues", id], {
    queryFn: () => getLeague(id),
  })
  const { isLoading: matchesAreLoading, data: matches } = useQuery(["leagues", id, "next_matches"], {
    queryFn: () => getLeagueNextMatches(id),
    initialData: [],
  })
  const mutation = useMutation({ mutationFn: ({id, data}: AddPrediction) => addPrediction(id, data) })

  async function handlePredictionSubmit(values: AddPredictionData) {
    try {
      await mutation.mutateAsync({
        id: id!,
        data: values,
      })
      navigate(`/leagues/${id}/predictions`)
    } catch (error) {
      console.error(error)
    }
  }

  if(isLoading || matchesAreLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <Container pt="md">
      <Stack>
        <Title>Predicción</Title>
        <Flex>
          <Button component={Link} to={`/leagues/${id}/predictions`} leftIcon={<IconArrowBack />}>
            Predicciones
          </Button>
        </Flex>
        <Text>Nueva predicción para {league?.name} ({league?.competition_name})</Text>
        {matches.length === 0 ? <Text color="cyan">No hay próximos partidos para esta competencia.</Text> : null}
        <PredictionForm
          editing={false}
          matches={matches}
          loading={mutation.isLoading}
          onSubmit={handlePredictionSubmit}
        />
        {!mutation.isError ? null : (
          <Alert title="Ups!" color="red">
            {getError(mutation.error).message}
          </Alert>
        )}
      </Stack>
    </Container>
  )
}
