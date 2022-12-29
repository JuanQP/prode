import { CompetitionForm } from "@/features/Competitions/CompetitionForm";
import { AdminGenericList } from "@/features/UI/AdminGenericList";
import { CompetitionUpdateValues, getCompetition, updateCompetition } from "@/helpers/competitionsApi";
import { deleteMatch } from "@/helpers/matchesApi";
import { Button, Container, Flex, Loader, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

interface MutationParams {
  id: string;
  values: CompetitionUpdateValues;
}

export function AdminCompetitionUpdate() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  if(!id) return <Navigate to="/" />

  const {data: competition, ...query} = useQuery(['competitions', id], {
    queryFn: () => getCompetition(id),
    keepPreviousData: true,
  })
  const mutation = useMutation({
    mutationFn: ({ id, values }: MutationParams) => updateCompetition(id, values),
    onSuccess: () => navigate('/admin/competitions')
  })
  const matchMutation = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => queryClient.invalidateQueries(['competitions', id]),
  })

  function handleSubmit(values: Pick<Competition, "name">) {
    mutation.mutate({ id: String(id), values })
  }

  function handleMatchDelete(match: Match) {
    if(confirm(`¿Estás seguro de borrar el partido ${match.detail}?`)) {
      matchMutation.mutate(String(match.id))
    }
  }

  if(query.isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack>
        <Title>Modificar competencia</Title>
        <CompetitionForm
          editing={true}
          loading={query.isLoading || mutation.isLoading}
          initialValues={competition}
          onSubmit={handleSubmit}
        />
        <Title order={3}>Partidos</Title>
        <Flex>
          <Button color="green" component={Link} to={`/admin/competitions/${id}/create-match`} leftIcon={<IconPlus />}>
            Crear
          </Button>
        </Flex>
        <AdminGenericList
          idField="id"
          items={competition?.matches ?? []}
          headers={["Encuentro", "Goles A", "Goles B", "Estado", "Fecha"]}
          columns={["detail", "team_a_score", "team_b_score", "status", "datetime"]}
          route={`/admin/matches`}
          onDelete={handleMatchDelete}
        />
      </Stack>
    </Container>
  )
}
