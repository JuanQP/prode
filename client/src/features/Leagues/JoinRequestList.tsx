import { ActionIcon, Badge, Flex, ScrollArea, Sx, Table, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

interface Props {
  loading: boolean;
  requests: JoinRequest[];
  onAcceptRequest: (request: AnsweredJoinRequest) => void;
  onRejectRequest: (request: AnsweredJoinRequest) => void;
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

export function JoinRequestList(props: Props) {

  function handleAcceptRequest(request: JoinRequest) {
    const newRequest = {
      ...request,
      accepted: true,
    }
    props.onAcceptRequest(newRequest)
  }

  function handleRejectRequest(request: JoinRequest) {
    const newRequest = {
      ...request,
      accepted: false,
    }
    props.onRejectRequest(newRequest)
  }

  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            <th style={tdStyle}>Usuario</th>
            <th style={tdStyle}>Aceptar / Rechazar</th>
          </tr>
        </thead>
        <tbody>
          {props.requests.length !== 0 ? null : (
            <tr>
              <td colSpan={3}>
                <Text m="xs" align="center" color="dimmed">
                  Esta lista está vacía...
                </Text>
              </td>
            </tr>
          )}
          {props.requests.map(request => (
            <tr key={request.id}>
              <td style={tdStyle}>
                {request.user.username}
              </td>
              <td style={tdStyle}>
                <Flex justify="space-evenly">
                  {request.accepted === null ? (
                    <>
                      <ActionIcon
                        loading={props.loading}
                        color="green"
                        variant="filled"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        <IconCheck />
                      </ActionIcon>
                      <ActionIcon
                        loading={props.loading}
                        color="red"
                        variant="filled"
                        onClick={() => handleRejectRequest(request)}
                      >
                        <IconX />
                      </ActionIcon>
                    </>
                  ) : (
                    <Badge variant="filled" color={request.accepted ? "green" : "dark"}>
                      {request.accepted ? "Aceptado" : "Rechazado"}
                    </Badge>
                  )}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
