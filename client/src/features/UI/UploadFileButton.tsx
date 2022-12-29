import { Button, Code, FileButton, Group, Text } from '@mantine/core';

interface Props {
  value: File | null;
  onChange: (file: File) => void;
}

export function UploadFileButton(props: Props) {

  return (
    <>
      <Group position="center">
        <FileButton onChange={props.onChange} accept="text/csv">
          {(props) => <Button {...props}>Subir archivo</Button>}
        </FileButton>
      </Group>
      {props.value ? (
        <Text size="sm" align="center" mt="sm">
          Archivo seleccionado: <Code>{props.value.name}</Code>
        </Text>
      ) : (
        <Text size="sm" align="center" mt="sm" color="dimmed">
          No seleccionaste ningún archivo
        </Text>
      )}
    </>
  );
}
