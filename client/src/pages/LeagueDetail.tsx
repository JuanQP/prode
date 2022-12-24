import { ParticipantList } from "@/features/Leagues/ParticipantList";
import { getLeague } from "@/helpers/leaguesApi";
import { Button, Container, Flex, Loader, Text, Title } from "@mantine/core";
import { IconPlus, IconUserPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export function LeagueDetail() {

  const { id } = useParams()

  if(!id) {
    return <Navigate to="/competitions" />
  }

  const { isError, isLoading, data: league } = useQuery(["leagues", id], {
    queryFn: () => getLeague(id),
  })

  if(isLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <Container pt="md">
      <Title>{league.name}</Title>
      <Title my="sm" order={3} color="dimmed">{league.competition_name}</Title>
      <Flex gap="sm">
        <Button leftIcon={<IconPlus />}>Predicción</Button>
        <Button leftIcon={<IconUserPlus />}>Unirse</Button>
      </Flex>
      <Title mt="md" order={3}>Clasificación</Title>
      <ParticipantList participants={league.participants} />
    </Container>
  )
}
