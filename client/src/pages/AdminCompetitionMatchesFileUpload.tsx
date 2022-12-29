import { UploadFileButton } from "@/features/UI/UploadFileButton";
import { uploadMatchesFile } from "@/helpers/competitionsApi";
import { Anchor, Button, Card, Code, Container, Flex, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowBack, IconCheck, IconUpload } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

interface MutationFn {
  id: string | number;
  file: File;
}

export function AdminCompetitionMatchesFileUpload() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)

  if(!id) return <Navigate to="/" />

  const mutation = useMutation({
    mutationFn: ({ id, file }: MutationFn) => uploadMatchesFile(id, file),
    onSuccess: () => navigate(`/admin/competitions/${id}`)
  })

  function handleSubmit() {
    if(!file || !id) return

    mutation.mutate({ id, file })
  }

  return (
    <Container pt="md">
      <Stack>
        <Title>Crear partidos</Title>
        <Flex>
          <Button component={Link} to={`/admin/competitions/${id}`} leftIcon={<IconArrowBack />}>
            Competición
          </Button>
        </Flex>
        <Text>Podés subir un archivo <Code>.csv</Code> para cargar partidos de manera masiva. Tené en cuenta que para que todo funcione correctamente es necesario:</Text>
        <List size="sm" spacing="xs" center icon={<ThemeIcon radius="xl"><IconCheck /></ThemeIcon>}>
          <List.Item>Un <Code>.csv</Code> con encoding <Code>UTF-8</Code>.</List.Item>
          <List.Item>La primer fila debe ser <Code>team_a,team_b,datetime,stadium,description</Code>.</List.Item>
          <List.Item>
            <Code>team_a</Code> y <Code>team_b</Code> son los ID de los equipos. En <Anchor component={Link} to={`/admin/teams`} underline>la página de equipos</Anchor> podés ver todos los ID.</List.Item>
          <List.Item><Code>datetime</Code> tiene el formato ISOString, por ejemplo: <Code>2022-12-18T15:00:00Z</Code>.</List.Item>
          <List.Item>El archivo debe pesar menos de 2MB.</List.Item>
        </List>
        <Card>
          <UploadFileButton
            value={file}
            onChange={setFile}
          />
          <Flex justify="end">
            <Button color="green" leftIcon={<IconUpload />} onClick={handleSubmit}>
              Subir
            </Button>
          </Flex>
        </Card>
      </Stack>
    </Container>
  )
}
