import { Card, DefaultMantineColor, Flex, List, Text, ThemeIcon } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";

interface Props<T> {
  idField: keyof T;
  title: string;
  iconColor: DefaultMantineColor;
  Icon: TablerIcon;
  items: T[];
  itemTitle: (item: T) => string;
  itemSubtitle: (item: T) => string;
}

export function ListWithIcon<T>(props: Props<T>) {
  return (
    <Card>
      <Text fw="bold" mb="md">{props.title}</Text>
      <List
        center
        spacing="xs"
        icon={
          <ThemeIcon color={props.iconColor} size="lg" radius="xl">
            <props.Icon />
          </ThemeIcon>
        }
      >
        {props.items.map(item => (
          <List.Item key={String(item[props.idField])}>
            <Flex direction="column">
              <Text>{props.itemTitle(item)}</Text>
              <Text color="dimmed">{props.itemSubtitle(item)}</Text>
            </Flex>
          </List.Item>
        ))}
      </List>
    </Card>
  )
}
