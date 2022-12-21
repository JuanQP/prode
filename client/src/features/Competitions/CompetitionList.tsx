import { Grid } from "@mantine/core";
import { CompetitionCard } from "./CompetitionCard";

interface Props {
  competitions: Competition[];
}

export function CompetitionList(props: Props) {
  return (
    <Grid gutterMd="sm">
      {props.competitions.map(competition => (
        <Grid.Col key={competition.id} xs={12} sm={6} md={4}>
          <CompetitionCard competition={competition} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
