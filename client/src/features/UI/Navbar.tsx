import { Box, Button, Container } from "@mantine/core";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

export function Navbar() {

  const isAuth = useIsAuthenticated()
  const signOut = useSignOut()

  const LoginButton = (
    <Button variant="subtle" component={Link} to="/login">Login</Button>
  )
  const LogoutButton = (
    <Button variant="subtle" onClick={handleLogout}>Logout</Button>
  )

  function handleLogout() {
    signOut()
  }

  return (
    <Box mb="lg">
      <Container>
        <Button variant="subtle" component={Link} to="/">Home</Button>
        {isAuth() ? LogoutButton : LoginButton}
      </Container>
    </Box>
  )
}
