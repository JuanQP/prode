import { PredictionForm } from "@/features/Predictions/PredictionForm";
import { getError } from "@/helpers/getError";
import { getLeagueMatches } from "@/helpers/leaguesApi";
import { getPrediction, updatePrediction } from "@/helpers/predictionsApi";
import { Alert, Container, Loader, Text, Title } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

interface UpdatePrediction {
  id: string;
  data: Pick<AddPredictionData, "team_a_score" | "team_b_score">;
}

export function PredictionDetail() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) {
    return <Navigate to={`/competitions/`} />
  }

  const { isError, isLoading, data: prediction } = useQuery(["predictions", id], {
    queryFn: () => getPrediction(id),
  })
  const { isLoading: matchesAreLoading, data: matches } = useQuery(["leagues", id, "matches"], {
    queryFn: () => getLeagueMatches(id),
    initialData: [],
  })
  const mutation = useMutation({
    mutationFn: ({id, data}: UpdatePrediction) => updatePrediction(id, data),
    onError: (err) => ({ message: '' })
  })

  async function handlePredictionSubmit(values: UpdatePrediction["data"]) {
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

  const initialValues: AddPredictionData = {
    match: prediction.match.id,
    team_a_score: prediction.team_a_score,
    team_b_score: prediction.team_b_score,
  }

  const matchDatetime = (new Date(prediction.match.datetime)).toLocaleString()
  const canEdit = (new Date(prediction.match.datetime)).getTime() > (new Date()).getTime()

  return (
    <Container pt="md">
      <Title>Predicción</Title>
      <Text color="dimmed">
        Podés editar tu predicción hasta antes de {matchDatetime}
      </Text>
      <PredictionForm
        disabled={!canEdit}
        editing={true}
        initialValues={initialValues}
        matches={matches}
        loading={mutation.isLoading}
        onSubmit={handlePredictionSubmit}
      />
      {!mutation.isError ? null : (
        <Alert mt="md" title="Ups!" color="red">
          {getError(mutation.error).message}
        </Alert>
      )}
    </Container>
  )
}
