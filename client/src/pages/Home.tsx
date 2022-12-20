import { Container, Text } from "@mantine/core";
import { useEffect, useState } from "react";

type ServerResponse = {
  message: string;
}

export function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello-world')
      .then<ServerResponse>((value) => value.json())
      .then(response => setMessage(response.message))
  }, [])

  return (
    <Container>
      <Text>This is the home page.</Text>
      <Text color="teal">{message}</Text>
    </Container>
  )
}
