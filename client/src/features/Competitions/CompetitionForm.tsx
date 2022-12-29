import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  loading: boolean;
  editing: boolean;
  initialValues?: Pick<Competition, "id" | "name">;
  onSubmit: (values: Pick<Competition, "name">) => void;
}

const schema = z.object({
  name: z.string().min(1),
})

export function CompetitionForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<Competition>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })

  function handleFormSubmit(values: Competition) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Nombre"
          placeholder="FIFA World Cup Qatar 2022"
          error={errors.name?.message}
          {...register('name')}
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
