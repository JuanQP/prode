import { LeagueList } from "@/features/Leagues/LeagueList";
import { getLeagues } from "@/helpers/leaguesApi";
import { Container, Loader, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export function Leagues() {

  const { data: leagues, isLoading } = useQuery({
    queryKey: ['leagues'],
    queryFn: getLeagues,
    initialData: [],
  })

  return (
    <Container pt="md">
      <Title>Ligas</Title>
      <Text my="md">Todas las ligas</Text>
      {isLoading ? <Loader /> : <LeagueList showCompetitionName leagues={leagues} />}
    </Container>
  )
}
