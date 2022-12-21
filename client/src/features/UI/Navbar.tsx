import { navbarLinks } from "@/helpers/links";
import { Anchor, Box, Burger, Container, Group, Sx } from "@mantine/core";
import { useState } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";
import { NavigationDrawer } from "./NavigationDrawer";

const boxStyle: Sx = (theme) => ({
  backgroundColor: theme.colors.teal[5],
})

export function Navbar() {

  const [drawerOpened, setDrawerOpened] = useState(false)
  const isAuth = useIsAuthenticated()
  const signOut = useSignOut()

  const LoginButton = (
    <Anchor variant="text" ml="auto" mr="sm" component={Link} to="/login">Login</Anchor>
  )
  const LogoutButton = (
    <Anchor variant="text" ml="auto" mr="sm" onClick={handleLogout}>Logout</Anchor>
  )

  function handleLogout() {
    signOut()
  }

  return (
    <Box p="xs" sx={boxStyle}>
      <NavigationDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        onLinkClick={() => setDrawerOpened(false)}
      />
      <Container sx={{ width: '100%' }} display="flex">
        <Group sx={{ width: '100%' }}>
          {navbarLinks.map(link => (
            <Anchor key={link.label} variant="text" component={Link} to={link.to}>{link.label}</Anchor>
          ))}
          {isAuth() ? LogoutButton : LoginButton}
        </Group>
        <Burger
          opened={drawerOpened}
          onClick={() => setDrawerOpened(previous => !previous)}
        />
      </Container>
    </Box>
  )
}
