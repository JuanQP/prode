import { Box, Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <Box mb="lg">
      <Container>
        <Button variant="subtle" component={Link} to="/">Home</Button>
        <Button variant="subtle" component={Link} to="/login">Login</Button>
      </Container>
    </Box>
  )
}
