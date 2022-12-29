import { JoinRequestList } from "@/features/Leagues/JoinRequestList";
import { ParticipantList } from "@/features/Leagues/ParticipantList";
import { updateJoinRequest, UpdateJoinRequestData } from "@/helpers/joinRequestsApi";
import { getMyLeague } from "@/helpers/leaguesApi";
import { Box, Button, Container, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack, IconEdit } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";

interface MutationFnVariables {
  id: string;
  data: UpdateJoinRequestData;
}

export function MyLeagueDetail() {

  const { id } = useParams()
  const queryClient = useQueryClient()

  if(!id) return <Navigate to="/leagues" />

  const { data: league, isLoading } = useQuery(['leagues', id, 'my_league'], {
    queryFn: () => getMyLeague(id),
  })
  const mutation = useMutation({
    mutationFn: ({ id, data }: MutationFnVariables) => updateJoinRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['leagues', id, 'my_league']
      })
    }
  })

  function handleRequestSubmit(request: AnsweredJoinRequest) {
    const { accepted } = request
    mutation.mutate({ id: String(request.id), data: { accepted } })
  }

  if(isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack spacing="xs">
        <Title>{league?.name}</Title>
        <Flex gap="sm">
          <Button component={Link} to={`/leagues/update/${id}`} leftIcon={<IconEdit />}>Editar</Button>
          <Button component={Link} to={`/my-leagues`} leftIcon={<IconArrowBack />}>
            Mis ligas
          </Button>
        </Flex>
        <Box>
          <Title order={3} color="dimmed">{league?.competition_name}</Title>
        </Box>
        <Box>
          <Text>Participantes</Text>
          <ParticipantList participants={league?.participants ?? []} />
        </Box>
        <Box>
          <Text>Solicitudes de ingreso</Text>
          <JoinRequestList
            loading={mutation.isLoading}
            requests={league?.join_requests ?? []}
            onAcceptRequest={handleRequestSubmit}
            onRejectRequest={handleRequestSubmit}
          />
        </Box>
      </Stack>
    </Container>
  )
}
