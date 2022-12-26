import { LeagueForm } from "@/features/Leagues/LeagueForm";
import { getCompetitions } from "@/helpers/competitionsApi";
import { getError } from "@/helpers/getError";
import { createLeague, CreateLeagueData } from "@/helpers/leaguesApi";
import { Alert, Container, Loader, Text, Title } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export function CreateLeague() {

  const [params] = useSearchParams()
  const isAuth = useIsAuthenticated()
  const navigate = useNavigate()

  if(!isAuth()) {
    return <Navigate to={`/competitions/`} />
  }

  const { isError, isLoading, data: competitions } = useQuery(["competitions"], {
    queryFn: getCompetitions,
  })
  const mutation = useMutation({ mutationFn: createLeague })

  async function handlePredictionSubmit(values: CreateLeagueData) {
    try {
      await mutation.mutateAsync(values)
      navigate(`/leagues`)
    } catch (error) {
      console.error(error)
    }
  }

  if(isLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  const competition = params.get('competition')
  const initialValues: CreateLeagueData | undefined = !competition ? undefined : {
    name: '',
    is_public: false,
    competition: Number(competition),
  }

  return (
    <Container pt="md">
      <Title>Nueva liga</Title>
      <LeagueForm
        editing={false}
        initialValues={initialValues}
        competitions={competitions}
        loading={mutation.isLoading}
        onSubmit={handlePredictionSubmit}
      />
      {!mutation.isError ? null : (
        <Alert title="Ups!" color="red">
          {getError(mutation.error).message}
        </Alert>
      )}
    </Container>
  )
}
