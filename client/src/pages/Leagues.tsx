import { LeagueList } from "@/features/Leagues/LeagueList";
import { getLeagues } from "@/helpers/leaguesApi";
import { Button, Container, Loader, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
      <Button component={Link} to="/leagues/create" mb="md" leftIcon={<IconPlus />}>
        Crear liga
      </Button>
      {isLoading ? <Loader /> : <LeagueList showCompetitionName leagues={leagues} />}
    </Container>
  )
}
