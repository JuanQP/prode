import { UploadFileButton } from "@/features/UI/UploadFileButton";
import { uploadFile } from "@/helpers/teamsApi";
import { Button, Card, Code, Container, Flex, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck, IconUpload } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminTeamFileUpload() {

  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => navigate('/admin/teams')
  })

  function handleSubmit() {
    if(!file) return

    mutation.mutate(file)
  }

  return (
    <Container pt="md">
      <Stack>
        <Title>Crear equipos</Title>
        <Text>Podés subir un archivo <Code>.csv</Code> para cargar equipos de manera masiva. Tené en cuenta que para que todo funcione correctamente es necesario:</Text>
        <List size="sm" spacing="xs" center icon={<ThemeIcon radius="xl"><IconCheck /></ThemeIcon>}>
          <List.Item>Un <Code>.csv</Code> con encoding <Code>UTF-8</Code>.</List.Item>
          <List.Item>La primer fila debe ser <Code>name,short_name</Code>.</List.Item>
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
