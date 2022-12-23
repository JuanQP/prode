import background from '@/assets/login_background.svg';
import { Box, Center, Container, Sx } from "@mantine/core";
import { Helmet } from 'react-helmet-async';
import { Outlet } from "react-router-dom";

const styles: Sx = {
  background: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100vh',
  width: '100vw'
}

export function LoginLayout() {
  return (
    <Box sx={styles}>
      <Helmet>
        <meta name="theme-color" content="#2d9cf7" />
      </Helmet>
      <Container size="sm" sx={{ height: '100%' }}>
        <Center sx={{ height: '100%' }}>
          {/* Here goes the page content 👇 */}
          <Outlet />
        </Center>
      </Container>
    </Box>
  )
}
