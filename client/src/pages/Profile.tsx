import { PasswordForm } from "@/features/Profile/PasswordForm";
import { UserInfoForm } from "@/features/Profile/UserInfoForm";
import { Avatar } from "@/features/UI/Avatar";
import { changePassword, ChangePasswordData, getCurrentUser, updateUserInfo, UserData } from "@/helpers/api";
import { Box, Container, Flex, Loader, Stack, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ChangePassword {
  id: string;
  values: ChangePasswordData;
}

export function Profile() {

  const { data: user, isLoading } = useQuery(['users', 'me'], {
    queryFn: getCurrentUser,
    keepPreviousData: true,
  })
  const queryClient = useQueryClient()
  const infoMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => queryClient.invalidateQueries(['users', 'me']),
  })
  const passwordMutation = useMutation({
    mutationFn: ({ id, values }: ChangePassword) => changePassword(id, values),
    onSuccess: () => queryClient.invalidateQueries(['users', 'me']),
  })

  function handleUserInfoSubmit(values: UserData) {
    infoMutation.mutate(values)
  }

  function handlePasswordSubmit(values: ChangePasswordData) {
    passwordMutation.mutate({ id: String(user?.id), values: values })
  }

  const initialValues = {
    first_name: user?.first_name ?? '',
    avatar: null,
  }

  if(isLoading) return <Loader />

  return (
    <Container pt="md">
      <Stack spacing="md">
        <Title>Perfil</Title>
        <Flex justify="center">
          <Avatar src={user?.avatar} width={100} height={100} radius={50} />
        </Flex>
        <Box>
          <Title order={3}>Información personal</Title>
          <UserInfoForm
            loading={infoMutation.isLoading}
            initialValues={initialValues}
            onSubmit={handleUserInfoSubmit}
          />
        </Box>
        <Box>
          <Title order={3}>Cambiar contraseña</Title>
          <PasswordForm
            loading={passwordMutation.isLoading}
            onSubmit={handlePasswordSubmit}
          />
        </Box>
      </Stack>
    </Container>
  )
}
