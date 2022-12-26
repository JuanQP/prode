import { LeagueList } from "@/features/Leagues/LeagueList";
import { getMyParticipations } from "@/helpers/participantsApi";
import { Container, Loader, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export function MyParticipations() {

  const { data: participations, isLoading } = useQuery({
    queryKey: ['my-participations'],
    queryFn: getMyParticipations,
    initialData: [],
  })
  const leagues = participations.map(participation => participation.league)

  return (
    <Container pt="md">
      <Title>Mis Participaciones</Title>
      <Text my="md">Todas las ligas en las que estás participando</Text>
      {isLoading ? <Loader /> : <LeagueList leagues={leagues} />}
    </Container>
  )
}
