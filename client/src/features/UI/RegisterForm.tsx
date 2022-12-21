import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  password2: z.string().min(1),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z.string().optional(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ['password2'],
})

export type RegisterData = z.infer<typeof schema>

interface Props {
  loading: boolean;
  onSubmit: (credentials: RegisterData) => void;
}

export function RegisterForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
      avatar: '',
    }
  })

  function handleFormSubmit(values: RegisterData) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <TextInput
          required
          label="Nombre de usuario"
          type="text"
          error={errors.username?.message}
          {...register('username')}
        />
        <TextInput
          required
          label="E-Mail"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordInput
          required
          label="Contraseña"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          required
          label="Confirmar contraseña"
          error={errors.password2?.message}
          {...register('password2')}
        />
        <TextInput
          label="Nombre"
          type="text"
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <TextInput
          label="Apellido"
          type="text"
          error={errors.last_name?.message}
          {...register('last_name')}
        />
        <Button loading={props.loading} color="green" type="submit">
          Crear cuenta
        </Button>
      </Stack>
    </Box>
  )
}
