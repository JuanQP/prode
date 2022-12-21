import { Container, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

type ServerResponse = {
  message: string;
}

export function Home() {
  const { data, isError } = useQuery({
    queryKey: ['hello-world'],
    queryFn: () => fetch('/api/hello-world').then<ServerResponse>((value) => value.json()),
    placeholderData: { message: '...' }
  })

  return (
    <Container>
      <Text>This is the home page.</Text>
      <Text color={isError ? "red" : "teal"}>{data?.message}</Text>
    </Container>
  )
}
