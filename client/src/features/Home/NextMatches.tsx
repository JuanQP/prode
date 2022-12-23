import { Card, Flex, List, Text, ThemeIcon } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons";

interface Props {
  matches: Match[];
}

export function NextMatches(props: Props) {
  return (
    <Card>
      <Text fw="bold" mb="md">Próximos partidos</Text>
      <List
        center
        spacing="xs"
        icon={
          <ThemeIcon color="grape" size="lg">
            <IconCalendarEvent />
          </ThemeIcon>
        }
      >
        {props.matches.map(match => (
          <List.Item key={match.id}>
            <Flex direction="column">
              <Text>{`${match.team_a_detail.name} - ${match.team_b_detail.name}`}</Text>
              <Text color="dimmed">{(new Date(match.datetime)).toLocaleString()}</Text>
            </Flex>
          </List.Item>
        ))}
      </List>
    </Card>
  )
}
