import { Badge, ScrollArea, Sx, Table } from "@mantine/core";

interface Props {
  matches: Match[];
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

export function MatchList(props: Props) {
  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            <th style={tdStyle}>Partido</th>
            <th style={tdStyle}>Resultado</th>
            <th style={tdStyle}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {props.matches.map(match => (
            <tr key={match.id}>
              <td style={tdStyle}>{`${match.team_a_detail.name} - ${match.team_b_detail.name}`}</td>
              <td style={tdStyle}>
                {match.status === "Finalizado" ? `${match.team_a_score} - ${match.team_b_score}`
                  : (
                      <Badge variant="filled" color="blue">
                        {match.status}
                      </Badge>
                    )
                }
              </td>
              <td style={tdStyle}>{(new Date(match.datetime)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
