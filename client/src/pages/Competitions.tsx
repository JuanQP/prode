import { CompetitionList } from "@/features/Competitions/CompetitionList";
import { getCompetitions } from "@/helpers/competitionsApi";
import { Container, Loader, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export function Competitions() {

  const { data: competitions, isLoading } = useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
    initialData: [],
  })

  return (
    <Container pt="md">
      <Title>Competiciones</Title>
      <Text my="md">Competiciones en curso 👇</Text>
      {isLoading ? <Loader /> : <CompetitionList competitions={competitions} />}
    </Container>
  )
}
