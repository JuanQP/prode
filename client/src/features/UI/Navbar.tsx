import { navbarLinks, navigationLinks } from "@/helpers/links";
import { Anchor, Box, Burger, Container, Flex, Group, MediaQuery, Sx } from "@mantine/core";
import { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import { NavigationDrawer } from "./NavigationDrawer";

const boxStyle: Sx = (theme) => ({
  backgroundColor: theme.colors.teal[5],
})

export function Navbar() {

  const [drawerOpened, setDrawerOpened] = useState(false)
  const isAuth = useIsAuthenticated()

  const LoginButton = (
    <Anchor variant="text" ml="auto" mr="sm" component={Link} to="/login">Login</Anchor>
  )

  return (
    <Box p="xs" sx={boxStyle}>
      <NavigationDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        onLinkClick={() => setDrawerOpened(false)}
      />
      <Container sx={{ width: '100%' }} display="flex">
        <Group sx={{ width: '100%' }}>
          <Anchor key={navbarLinks[0].label} variant="text" component={Link} to={navbarLinks[0].to}>
            {navbarLinks[0].label}
          </Anchor>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Flex gap="md">
              {navigationLinks.map(link => (
                <Anchor key={link.label} variant="text" component={Link} to={link.to}>{link.label}</Anchor>
              ))}
            </Flex>
          </MediaQuery>
          {isAuth() ? null : LoginButton}
        </Group>
        <Burger
          opened={drawerOpened}
          onClick={() => setDrawerOpened(previous => !previous)}
        />
      </Container>
    </Box>
  )
}
