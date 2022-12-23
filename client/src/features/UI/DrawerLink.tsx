import { NavbarLink } from "@/helpers/links";
import { Anchor, DefaultMantineColor, Group, Text, ThemeIcon } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  link: NavbarLink;
  color?: DefaultMantineColor;
  onClick?: () => void;
}

export function DrawerLink(props: Props) {
  return (
    <Anchor
      key={props.link.label}
      variant="text"
      component={Link}
      to={props.link.to}
      onClick={props.onClick}
    >
      <Group>
        <ThemeIcon color={props.color} size="lg"><props.link.Icon /></ThemeIcon>
        <Text>{props.link.label}</Text>
      </Group>
    </Anchor>
  )
}
