import { LeagueList } from "@/features/Leagues/LeagueList";
import { MatchList } from "@/features/Matches/MatchList";
import { getCompetition } from "@/helpers/competitionsApi";
import { Center, Container, Loader, Stack, Sx, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

const centerStyle: Sx = {
  minHeight: 155,
}

export function CompetitionDetail() {

  const { id } = useParams()

  if(!id) {
    return <Navigate to="/competitions" />
  }

  const { isError, isLoading, data: competition } = useQuery(["competitions", id], {
    queryFn: () => getCompetition(id),
  })

  if(isLoading) return <Loader />
  if(isError) return <Text color="red">Ocurrió un error</Text>

  return (
    <>
      <Center sx={centerStyle}>
        <Title align="center" fw="lighter">{competition.name}</Title>
      </Center>
      <Container px={0}>
        <Stack>
          <Title align="center" fw="lighter" order={2}>Partidos</Title>
          <MatchList matches={competition.matches} />
          <Title align="center" fw="lighter" order={2}>Ligas</Title>
          <LeagueList leagues={competition.leagues} />
        </Stack>
      </Container>
    </>
  )
}
