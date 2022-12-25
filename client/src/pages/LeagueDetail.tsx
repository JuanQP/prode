import { ParticipantList } from "@/features/Leagues/ParticipantList";
import { createJoinRequest, getCanJoin, getLeague } from "@/helpers/leaguesApi";
import { Button, Container, Flex, Loader, Text, Title } from "@mantine/core";
import { IconPlus, IconUserPlus } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useParams } from "react-router-dom";

export function LeagueDetail() {

  const { id } = useParams()
  const isAuth = useIsAuthenticated()
  const queryClient = useQueryClient()

  if(!id) {
    return <Navigate to="/competitions" />
  }

  const { isError, isLoading, data: league } = useQuery(["leagues", id], {
    queryFn: () => getLeague(id),
  })
  const { data: joinRequest } = useQuery(["leagues", id, "can_join"], {
    queryFn: () => getCanJoin(id),
  })
  const mutation = useMutation({ mutationFn: createJoinRequest })

  function handleAddPredictionClick() {
    console.log("New prediction")
  }

  async function handleJoinRequestClick() {
    try {
      const response = await mutation.mutateAsync(id!)
    } catch (error) {
      console.error(error)
    } finally {
      queryClient.invalidateQueries({
        queryKey: ['leagues', id, 'can_join'],
      })
    }
  }

  if(isLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <Container pt="md">
      <Title>{league.name}</Title>
      <Title my="sm" order={3} color="dimmed">{league.competition_name}</Title>
      <Flex gap="sm">
        <Button
          disabled={!isAuth() || !joinRequest?.is_participant}
          leftIcon={<IconPlus />}
          onClick={handleAddPredictionClick}
        >
          Predicción
        </Button>
        {(league.is_public || joinRequest?.is_participant) && isAuth() ? null : (
          <Button
            disabled={!isAuth() || !joinRequest?.can_join}
            leftIcon={<IconUserPlus />}
            loading={mutation.isLoading}
            onClick={handleJoinRequestClick}
          >
            Unirse
          </Button>
        )}
      </Flex>
      <Text my="md" color={"dimmed"}>
        {!joinRequest?.can_join && joinRequest?.message}
      </Text>
      <Title order={3}>Clasificación</Title>
      <ParticipantList participants={league.participants} />
    </Container>
  )
}
