import { ScrollArea, Sx, Table } from "@mantine/core";

interface Props {
  participants: Participant[];
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

export function ParticipantList(props: Props) {

  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            <th style={tdStyle}>#</th>
            <th style={tdStyle}>Usuario</th>
            <th style={tdStyle}>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {props.participants.map((participant, index) => (
            <tr key={participant.id}>
              <td style={tdStyle}>{index+1}</td>
              <td style={tdStyle}>{participant.user.username}</td>
              <td style={tdStyle}>{participant.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
