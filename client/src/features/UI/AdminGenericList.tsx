import { ActionIcon, Flex, ScrollArea, Sx, Table, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { Link } from "react-router-dom";

interface Props<T> {
  idField: keyof T;
  headers: string[];
  columns: (keyof T)[];
  items: T[];
  route: string;
  onDelete: (item: T) => void;
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

export function AdminGenericList<T>(props: Props<T>) {

  return (
    <ScrollArea styles={scrollAreaStyles}>
      <Table withColumnBorders sx={tableStyles}>
        <thead>
          <tr>
            {props.headers.map((header, index) => (
              <th key={index} style={tdStyle}>{header}</th>
            ))}
            <th style={tdStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.items.length !== 0 ? null : (
            <tr>
              <td colSpan={props.headers.length + 1}>
                <Text m="xs" align="center" color="dimmed">
                  Esta lista está vacía...
                </Text>
              </td>
            </tr>
          )}
          {props.items.map(item => (
            <tr key={String(item[props.idField])}>
              {props.columns.map(column => (
                <td key={`${item[props.idField]}-${String(column)}`} style={tdStyle}>
                  {String(item[column])}
                </td>
              ))}
              <td>
                <Flex justify="space-evenly">
                  <ActionIcon color="blue" component={Link} to={`${props.route}/${item[props.idField]}`}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => props.onDelete(item)}>
                    <IconTrash />
                  </ActionIcon>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
