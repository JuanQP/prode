import { Anchor, Badge, Indicator, ScrollArea, Sx, Table } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  urlBase?: "/leagues" | "/my-leagues";
  showCompetitionName?: boolean;
  showRequests?: boolean;
  leagues: League[] | MyLeague[];
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

function isMyLeague(league: unknown): league is MyLeague {
  if(typeof league === "object" && league !== null) {
    return Object.hasOwn(league, 'join_requests')
  }
  return false
}

export function LeagueList({ urlBase = '/leagues', leagues, showCompetitionName = false, showRequests = false }: Props) {

  function countUnansweredRequests(league: MyLeague) {
    return league.join_requests.filter(jr => jr.accepted === null).length
  }

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
                {!showRequests ? (
                  <Anchor underline component={Link} to={`${urlBase}/${league.id}/`}>
                    {league.name}
                  </Anchor>
                ) : (
                  <Anchor underline component={Link} to={`${urlBase}/${league.id}/`}>
                    <Indicator
                      styles={{ indicator: { boxShadow: '2px 2px black' } }}
                      m="xs"
                      p="xs"
                      inline
                      size={16}
                      showZero={false}
                      dot={false}
                      label={isMyLeague(league) ? countUnansweredRequests(league) : 0}
                    >
                      {league.name}
                    </Indicator>
                  </Anchor>
                )}
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
