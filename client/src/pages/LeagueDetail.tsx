import { ParticipantList } from "@/features/Leagues/ParticipantList";
import { createJoinRequest, getCanJoin, getLeague } from "@/helpers/leaguesApi";
import { Button, Container, Flex, Loader, Text, Title } from "@mantine/core";
import { IconQuestionMark, IconUserPlus } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link, Navigate, useParams } from "react-router-dom";

export function LeagueDetail() {

  const { id } = useParams()
  const isAuth = useIsAuthenticated()
  const authData = useAuthUser()
  const queryClient = useQueryClient()

  if(!id) {
    return <Navigate to="/competitions" />
  }

  const { isError, isLoading, data: league } = useQuery(["leagues", id], {
    queryFn: () => getLeague(id),
  })
  const { isLoading: joinRequestsAreLoading, data: joinRequest } = useQuery(["leagues", id, "can_join"], {
    queryFn: () => getCanJoin(id),
  })
  const mutation = useMutation({ mutationFn: createJoinRequest })

  async function handleJoinRequestClick() {
    try {
      await mutation.mutateAsync(id!)
    } catch (error) {
      console.error(error)
    } finally {
      queryClient.invalidateQueries({
        queryKey: ['leagues', id, 'can_join'],
      })
    }
  }

  if(isLoading || joinRequestsAreLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <Container pt="md">
      <Title>{league.name}</Title>
      <Title my="sm" order={3} color="dimmed">{league.competition_name}</Title>
      <Flex gap="sm">
        <Button
          component={Link}
          disabled={!isAuth() || (!league.is_public && !joinRequest?.is_participant)}
          leftIcon={<IconQuestionMark />}
          to={`/leagues/${id}/predictions`}
        >
          Predicciones
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
      <ParticipantList
        highlightedParticipantId={authData()?.user.id}
        participants={league.participants}
      />
    </Container>
  )
}
