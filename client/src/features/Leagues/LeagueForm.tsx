import { CreateLeagueData } from "@/helpers/leaguesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Checkbox, NativeSelect, Stack, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  loading: boolean;
  competitions: Competition[];
  editing: boolean;
  initialValues?: CreateLeagueData;
  onSubmit: (values: CreateLeagueData) => void;
}

const schema = z.object({
  name: z.string().min(1),
  is_public: z.boolean(),
  competition: z.number().min(1),
})

export function LeagueForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<CreateLeagueData>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })
  const competitionsOptions = props.competitions.map(c => ({
    value: c.id.toString(),
    label: c.name,
  }))

  function handleFormSubmit(values: CreateLeagueData) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <NativeSelect
          withAsterisk
          disabled={props.editing || props.disabled}
          label="Competición"
          data={competitionsOptions}
          error={errors.competition?.message}
          {...register('competition', { valueAsNumber: true })}
        />
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Nombre"
          error={errors.name?.message}
          {...register('name')}
        />
        <Checkbox
          disabled={props.editing || props.disabled}
          label="Liga pública"
          {...register('is_public')}
        />
        <Button disabled={props.disabled} loading={props.loading} type="submit" leftIcon={<IconSend />}>
          Enviar
        </Button>
      </Stack>
    </Box>
  )
}
