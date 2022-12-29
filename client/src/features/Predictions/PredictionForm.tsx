import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Group, NativeSelect, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  loading: boolean;
  matches: Match[];
  editing: boolean;
  initialValues?: AddPredictionData;
  onSubmit: (values: AddPredictionData) => void;
}

const schema = z.object({
  match: z.number().min(1),
  team_a_score: z.string().regex(/^\d{1}$/, "Tiene que ser un único dígito"),
  team_b_score: z.string().regex(/^\d{1}$/, "Tiene que ser un único dígito"),
})

export function PredictionForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<AddPredictionData>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })
  const matchesOptions = props.matches.map(m => ({
    value: m.id.toString(),
    label: `${m.team_a_detail.name} - ${m.team_b_detail.name}`
  }))

  function handleFormSubmit(values: AddPredictionData) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <NativeSelect
          withAsterisk
          disabled={props.editing || props.disabled}
          label="Partido"
          data={matchesOptions}
          error={errors.match?.message}
          {...register('match', { valueAsNumber: true })}
        />
        <Group grow spacing="sm">
          <TextInput
            readOnly={props.disabled}
            withAsterisk
            size="lg"
            styles={{ input: { textAlign: 'center' } }}
            label="Goles del equipo A"
            type="number"
            error={errors.team_a_score?.message}
            {...register('team_a_score')}
            />
          <TextInput
            readOnly={props.disabled}
            withAsterisk
            size="lg"
            styles={{ input: { textAlign: 'center' } }}
            label="Goles del equipo B"
            type="number"
            error={errors.team_b_score?.message}
            {...register('team_b_score')}
          />
        </Group>
        <Flex justify="end">
          <Button color="green" disabled={props.disabled} loading={props.loading} type="submit" leftIcon={<IconDeviceFloppy />}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
