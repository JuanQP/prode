import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, NativeSelect, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  competitionId: number;
  disabled?: boolean;
  loading: boolean;
  initialValues?: MatchSchema;
  competitions: Competition[];
  teams: Team[];
  onSubmit: (values: MatchSchema) => void;
}

const schema = z.object({
  team_a: z.number().min(1),
  team_b: z.number().min(1),
  datetime: z.string().min(1),
  stadium: z.string().min(1),
  description: z.string(),
}).refine((data) => data.team_a !== data.team_b, {
  message: "Un equipo no puede jugar contra sí mismo.",
  path: ['team_b'],
})

type MatchSchema = z.infer<typeof schema>

export function MatchForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<MatchSchema>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })

  function handleFormSubmit(values: MatchSchema) {
    props.onSubmit(values)
  }

  const competitionsOptions = props.competitions.map(competition => ({
    value: String(competition.id),
    label: competition.name,
  }))
  const teamsOptions = props.teams.map(team => ({
    value: String(team.id),
    label: team.name,
  }))

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <NativeSelect
          disabled
          label="Competición"
          data={competitionsOptions}
          value={props.competitionId}
        />
        <NativeSelect
          withAsterisk
          disabled={props.disabled}
          label="Equipo A"
          data={teamsOptions}
          error={errors.team_a?.message}
          {...register('team_a', { valueAsNumber: true })}
        />
        <NativeSelect
          withAsterisk
          disabled={props.disabled}
          label="Equipo B"
          data={teamsOptions}
          error={errors.team_b?.message}
          {...register('team_b', { valueAsNumber: true })}
        />
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Fecha y hora"
          type="datetime-local"
          error={errors.datetime?.message}
          {...register('datetime')}
        />
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Estadio"
          placeholder="Estadio Lusail"
          error={errors.stadium?.message}
          {...register('stadium')}
        />
        <TextInput
          readOnly={props.disabled}
          withAsterisk
          label="Descripción"
          placeholder="Final de la Copa del Mundo"
          error={errors.description?.message}
          {...register('description')}
        />
        <Flex justify="end">
          <Button disabled={props.disabled} loading={props.loading} type="submit" leftIcon={<IconDeviceFloppy />}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
