import { PredictionList } from "@/features/Predictions/PredictionList";
import { getLeague, getLeaguePredictions } from "@/helpers/leaguesApi";
import { Button, Container, Flex, Loader, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useIsAuthenticated } from "react-auth-kit";
import { Link, Navigate, useParams } from "react-router-dom";

export function Predictions() {

  const { id } = useParams()
  const isAuth = useIsAuthenticated()

  if(!id || !isAuth()) {
    return <Navigate to="/" />
  }

  const { isError, isLoading, data: league } = useQuery(["leagues", id], {
    queryFn: () => getLeague(id),
  })
  const { isLoading: predictionsAreLoading, data: predictions } = useQuery(["leagues", id, "predictions"], {
    queryFn: () => getLeaguePredictions(id),
    initialData: [],
  })

  if(isLoading || predictionsAreLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <Container pt="md">
      <Title>Predicciones</Title>
      <Title my="sm" order={3} color="dimmed">{league.name}</Title>
      <Flex gap="sm">
        <Button
          component={Link}
          leftIcon={<IconPlus />}
          to={`/leagues/${id}/add-prediction`}
        >
          Predicción
        </Button>
      </Flex>
      <Title mt="sm" order={3}>Tus predicciones</Title>
      <PredictionList predictions={predictions} />
    </Container>
  )
}