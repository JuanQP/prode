import { Anchor, Box, ScrollArea, Sx, Table, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  predictions: Prediction[];
}

const tdStyle: React.CSSProperties = {
  textAlign: 'center',
}

const tableStyles: Sx = (theme) => ({
  boxShadow: '4px 4px black',
  borderColor: 'black',
  borderWidth: 2,
  borderStyle: 'solid',
  minWidth: 'max-content',
  '& thead > tr > th': {
    backgroundColor: theme.colors.cyan[2],
    color: 'black',
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 2,
  },
  '& tbody > tr > td': {
    borderColor: 'black',
    borderWidth: 2,
  },
})

const scrollAreaStyles = {
  root: {
    height: '100%',
  },
  viewport: {
    padding: 8,
  }
}

export function PredictionList(props: Props) {

  if(props.predictions.length === 0) {
    return (
      <Box>
        <Text align="center" color="dimmed">
          Todavía no hiciste predicciones en esta liga 🧐. Arriba podés crear una ☝️
        </Text>
      </Box>
    )
  }

  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            <th style={tdStyle}>Partido</th>
            <th style={tdStyle}>Predicción</th>
          </tr>
        </thead>
        <tbody>
          {props.predictions.map(prediction => (
            <tr key={prediction.id}>
              <td style={tdStyle}>
                <Anchor underline component={Link} to={`/predictions/${prediction.id}/`}>
                  {`${prediction.match.team_a_detail.name} - ${prediction.match.team_b_detail.name}`}
                </Anchor>
              </td>
              <td style={tdStyle}>
                {`${prediction.team_a_score} - ${prediction.team_b_score}`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
