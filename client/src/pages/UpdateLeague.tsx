import { LeagueForm } from "@/features/Leagues/LeagueForm";
import { getCompetitions } from "@/helpers/competitionsApi";
import { getError } from "@/helpers/getError";
import { CreateLeagueData, getLeague, updateLeague, UpdateLeagueData } from "@/helpers/leaguesApi";
import { Alert, Button, Container, Flex, Loader, Stack, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export function UpdateLeague() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) return <Navigate to="/my-leagues" />

  const { data: league, isLoading } = useQuery(['leagues', id], {
    queryFn: () => getLeague(id),
  })
  const { data: competitions } = useQuery(["competitions"], {
    queryFn: getCompetitions,
    initialData: [],
  })
  const mutation = useMutation({ mutationFn: ({id, data}: {id: string, data: UpdateLeagueData}) => updateLeague(id, data) })

  async function handleSubmit(values: CreateLeagueData) {
    try {
      const { name } = values
      await mutation.mutateAsync({ id: id!, data: { name } })
      navigate(`/my-leagues/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  if(isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Modificar liga</Title>
        <Flex>
          <Button component={Link} to={`/my-leagues/${id}`} leftIcon={<IconArrowBack />}>
            Mis ligas
          </Button>
        </Flex>
        <LeagueForm
          editing
          initialValues={league}
          loading={mutation.isLoading}
          competitions={competitions}
          onSubmit={handleSubmit}
        />
        {!mutation.isError ? null : (
          <Alert title="Ups!" color="red">
            {getError(mutation.error).message}
          </Alert>
        )}

      </Stack>
    </Container>
  )
}
