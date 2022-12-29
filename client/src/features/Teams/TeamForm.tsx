import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  loading: boolean;
  editing: boolean;
  initialValues?: Team;
  onSubmit: (values: Team) => void;
}

const schema = z.object({
  name: z.string().min(1),
  short_name: z.string().min(1),
})

export function TeamForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<Team>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })

  function handleFormSubmit(values: Team) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Nombre"
          placeholder="Argentina"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Nombre corto"
          placeholder="ARG"
          error={errors.short_name?.message}
          {...register('short_name')}
        />
        <Flex justify="end">
          <Button color="green" disabled={props.disabled} loading={props.loading} type="submit" leftIcon={<IconDeviceFloppy />}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
