import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  match: Match;
  loading: boolean;
  onSubmit: (values: MatchScoreSchema) => void;
}

const schema = z.object({
  team_a_score: z.string().min(1).max(2),
  team_b_score: z.string().min(1).max(2),
})

type MatchScoreSchema = z.infer<typeof schema>

export function FinishMatchForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<MatchScoreSchema>({
    resolver: zodResolver(schema),
    defaultValues: props.match,
  })

  function handleFormSubmit(values: MatchScoreSchema) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <Group grow>
          <TextInput
            withAsterisk
            readOnly={props.disabled}
            styles={{ input: { textAlign: 'center' } }}
            type="number"
            label={`Goles de ${props.match.team_a_detail.name}`}
            error={errors.team_a_score?.message}
            {...register('team_a_score')}
          />
          <TextInput
            withAsterisk
            readOnly={props.disabled}
            styles={{ input: { textAlign: 'center' } }}
            type="number"
            label={`Goles de ${props.match.team_b_detail.name}`}
            error={errors.team_b_score?.message}
            {...register('team_b_score')}
          />
        </Group>
        <Button disabled={props.disabled} loading={props.loading} type="submit" leftIcon={<IconDeviceFloppy />}>
          Guardar
        </Button>
      </Stack>
    </Box>
  )
}
