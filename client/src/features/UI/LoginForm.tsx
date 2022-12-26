import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { IconLogin } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginData = z.infer<typeof schema>

interface Props {
  loading: boolean;
  onSubmit: (credentials: LoginData) => void;
}

export function LoginForm(props: Props) {

  const { register, formState: { errors }, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  })

  function handleFormSubmit(values: LoginData) {
    props.onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing="sm">
        <TextInput
          label="E-Mail"
          type="email"
          error={errors.email?.message}
          {...register('email')}
          />
        <PasswordInput
          label="Contraseña"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button loading={props.loading} type="submit" leftIcon={<IconLogin />}>Ingresar</Button>
      </Stack>
    </Box>
  )
}
