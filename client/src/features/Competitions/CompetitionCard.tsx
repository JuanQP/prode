import { Anchor, Box, Card, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  competition: Competition;
}

export function CompetitionCard(props: Props) {

  const { competition } = props

  return (
    <Anchor variant="text" component={Link} to={`/competitions/${props.competition.id}`}>
      <Card withBorder shadow="sm" sx={{ height: '100%' }}>
        <Stack sx={{ height: '100%' }}>
          <Text>{competition.name}</Text>
          <Box mt="auto">
            <Text color="dimmed">{competition.match_count} partidos</Text>
            <Text color="dimmed">{competition.league_count} ligas creadas</Text>
          </Box>
        </Stack>
      </Card>
    </Anchor>
  )
}
