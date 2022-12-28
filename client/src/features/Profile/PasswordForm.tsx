import { ChangePasswordData } from "@/helpers/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, PasswordInput, Stack } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  loading: boolean;
  initialValues?: ChangePasswordData;
  onSubmit: (values: ChangePasswordData) => void;
}

const schema = z.object({
  password: z.string().min(1),
  password2: z.string().min(1),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ['password2'],
})

export function PasswordForm(props: Props) {

  const { reset, register, formState: { errors }, handleSubmit } = useForm<ChangePasswordData>({
    resolver: zodResolver(schema),
    defaultValues: props.initialValues,
  })

  function handleFormSubmit(values: ChangePasswordData) {
    props.onSubmit(values)
    reset()
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <PasswordInput
          withAsterisk
          disabled={props.loading}
          label="Nueva contraseña"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          withAsterisk
          disabled={props.loading}
          label="Repetir contraseña"
          error={errors.password2?.message}
          {...register('password2')}
        />
        <Flex justify="end">
          <Button color="green" loading={props.loading} type="submit" leftIcon={<IconDeviceFloppy />}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
