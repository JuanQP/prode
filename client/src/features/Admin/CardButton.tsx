import { Button, Card, Flex, Text } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  to: string;
  Icon: TablerIcon;
}

export function CardButton(props: Props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Text fw="bold">{props.title}</Text>
      <Text>{props.subtitle}</Text>
      <Flex justify="end" sx={{ marginTop: 'auto' }}>
        <Button leftIcon={<props.Icon size={20} />} component={Link} to={props.to}>
          Administrar
        </Button>
      </Flex>
    </Card>
  )
}
