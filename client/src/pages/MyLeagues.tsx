import { LeagueList } from "@/features/Leagues/LeagueList";
import { getMyLeagues } from "@/helpers/leaguesApi";
import { Button, Container, Loader, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function MyLeagues() {

  const { data: leagues, isLoading } = useQuery({
    queryKey: ['leagues', 'my-leagues'],
    queryFn: getMyLeagues,
    initialData: [],
  })

  return (
    <Container pt="md">
      <Title>Mis ligas</Title>
      <Text my="md">Todas las ligas que creaste</Text>
      <Button component={Link} to="/leagues/create" mb="md" leftIcon={<IconPlus />}>
        Crear liga
      </Button>
      {isLoading ? <Loader /> : <LeagueList urlBase="/my-leagues" showCompetitionName showRequests leagues={leagues} />}
    </Container>
  )
}
