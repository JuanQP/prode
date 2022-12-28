import { UserData } from "@/helpers/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FileInput, Flex, Stack, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  disabled?: boolean;
  loading: boolean;
  initialValues?: UserData;
  onSubmit: (values: UserData) => void;
}

const schema = z.object({
  first_name: z.string().optional(),
  avatar: z.instanceof(File).nullable(),
})

export function UserInfoForm(props: Props) {

  const { control, register, formState: { errors }, handleSubmit } = useForm<UserData>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })

  function handleFormSubmit(values: UserData) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label="Nombre"
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <FileInput
              label="Foto de perfil"
              placeholder="Subir archivo..."
              accept="image/png,image/jpeg"
              {...field}
            />
          )}
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
