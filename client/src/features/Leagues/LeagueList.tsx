import { Badge, ScrollArea, Table } from "@mantine/core";

interface Props {
  leagues: League[];
}

const tdStyle: React.CSSProperties = {
  textAlign: 'center',
}

export function LeagueList(props: Props) {

  return (
    <ScrollArea style={{ width: '100%', height: '100%' }}>
      <Table striped sx={{ minWidth: 'max-content' }}>
        <thead>
          <tr>
            <th style={tdStyle}>Nombre</th>
            <th style={tdStyle}>Creador</th>
            <th style={tdStyle}>Pública / Privada</th>
          </tr>
        </thead>
        <tbody>
          {props.leagues.map(league => (
            <tr key={league.id}>
              <td style={tdStyle}>{league.name}</td>
              <td style={tdStyle}>{league.owner_username}</td>
              <td style={tdStyle}>
                <Badge variant="filled" color={league.is_public ? 'green' : 'gray'}>
                  {league.is_public ? 'Pública' : 'Privada'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
