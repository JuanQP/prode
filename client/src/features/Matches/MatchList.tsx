import { Badge, ScrollArea, Table } from "@mantine/core";

interface Props {
  matches: Match[];
}

const tdStyle: React.CSSProperties = {
  textAlign: 'center',
}

export function MatchList(props: Props) {
  return (
    <ScrollArea style={{ height: '100%' }}>
      <Table striped sx={{ minWidth: 'max-content' }}>
        <thead>
          <tr>
            <th style={tdStyle}>Partido</th>
            <th style={tdStyle}>Resultado</th>
            <th style={tdStyle}>Fecha</th>
            <th style={tdStyle}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {props.matches.map(match => (
            <tr key={match.id}>
              <td style={tdStyle}>{`${match.team_a_detail.name} - ${match.team_b_detail.name}`}</td>
              <td style={tdStyle}>{`${match.team_a_score} - ${match.team_b_score}`}</td>
              <td style={tdStyle}>{match.datetime}</td>
              <td style={tdStyle}>
                <Badge color={match.status === "Finalizado" ? "gray" : "blue"}>
                  {match.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
