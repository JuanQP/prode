import { drawerLinks } from "@/helpers/links";
import { Anchor, Drawer, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
  onLinkClick: () => void;
}

export function NavigationDrawer(props: Props) {
  return (
    <Drawer
      padding="md"
      withCloseButton={false}
      opened={props.opened}
      onClose={props.onClose}
    >
      <Stack>
        <Text>Hola, usuario! 👋</Text>
        {drawerLinks.map(link => (
          <Anchor key={link.label} component={Link} to={link.to} onClick={props.onLinkClick}>
            {link.label}
          </Anchor>
        ))}
      </Stack>
    </Drawer>
  )
}
