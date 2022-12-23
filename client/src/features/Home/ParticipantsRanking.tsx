import { Card, Flex, List, Text, ThemeIcon } from "@mantine/core";
import { IconUser } from "@tabler/icons";

interface Props {
  participants: Participant[];
}

export function ParticipantsRanking(props: Props) {
  return (
    <Card>
      <Text fw="bold" mb="md">Mejores 10 jugadores</Text>
      <List
        center
        spacing="xs"
        icon={
          <ThemeIcon color="pink" size="lg" radius="xl">
            <IconUser />
          </ThemeIcon>
        }
      >
        {props.participants.map(participant => (
          <List.Item key={participant.id}>
            <Flex direction="column">
              <Text>{participant.user.username} ({participant.score} pts)</Text>
              <Text color="dimmed">{participant.league.name}</Text>
            </Flex>
          </List.Item>
        ))}
      </List>
    </Card>
  )
}
