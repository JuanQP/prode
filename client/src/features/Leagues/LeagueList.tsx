import { Anchor, Badge, ScrollArea, Sx, Table } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  showCompetitionName?: boolean;
  leagues: League[];
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

export function LeagueList({ leagues, showCompetitionName = false }: Props) {

  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            <th style={tdStyle}>Nombre</th>
            <th style={tdStyle}>Creador</th>
            {!showCompetitionName ? null : <th style={tdStyle}>Competición</th>}
            <th style={tdStyle}>Pública / Privada</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map(league => (
            <tr key={league.id}>
              <td style={tdStyle}>
                <Anchor underline component={Link} to={`/leagues/${league.id}/`}>
                  {league.name}
                </Anchor>
              </td>
              <td style={tdStyle}>{league.owner_username}</td>
              {!showCompetitionName ? null : (
                <td style={tdStyle}>{league.competition_name}</td>
              )}
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
