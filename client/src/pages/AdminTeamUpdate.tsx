import { TeamForm } from "@/features/Teams/TeamForm";
import { getTeam, TeamUpdateValues, updateTeam } from "@/helpers/teamsApi";
import { Button, Container, Flex, Loader, Stack, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

interface MutationParams {
  id: string;
  values: TeamUpdateValues;
}

export function AdminTeamUpdate() {

  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) return <Navigate to="/" />

  const {data: league, ...query} = useQuery(['teams', id], {
    queryFn: () => getTeam(id),
  })
  const mutation = useMutation({
    mutationFn: ({ id, values }: MutationParams) => updateTeam(id, values),
    onSuccess: () => navigate('/admin/teams')
  })

  function handleSubmit(values: Team) {
    mutation.mutate({ id: String(id), values })
  }

  if(query.isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Modificar equipo</Title>
        <Flex>
          <Button component={Link} to="/admin/teams" leftIcon={<IconArrowBack />}>
            Equipos
          </Button>
        </Flex>
        <TeamForm
          editing={true}
          loading={query.isLoading || mutation.isLoading}
          initialValues={league}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}
