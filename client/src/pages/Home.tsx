import fans from "@/assets/fans.svg";
import background from "@/assets/grass.jpg";
import { NextMatches } from "@/features/Home/NextMatches";
import { ParticipantsRanking } from "@/features/Home/ParticipantsRanking";
import { getNextMatches } from "@/helpers/matchesApi";
import { getRanking } from "@/helpers/participantsApi";
import { Box, Button, Container, Flex, Grid, Image, Loader, Stack, Sx, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const firstSectionStyle: Sx = (_theme) => ({
  minHeight: 300,
  background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
})

const secondSectionStyle: Sx = (theme) => ({
  minHeight: 200,
  backgroundColor: theme.colors.indigo[4],
})

const thirdSectionStyle: Sx = (theme) => ({
  minHeight: 200,
  backgroundColor: theme.colors.grape[2],
})

const textStyle: Sx = {
  color: 'white',
  textShadow: '2px 2px 4px black',
}

export function Home() {

  const { data: matches, isLoading: areMatchesLoading } = useQuery({
    queryKey: ['next-matches'],
    queryFn: getNextMatches,
    initialData: [],
  })

  const { data: participants, isLoading: areParticipantsLoading } = useQuery({
    queryKey: ['participants', 'ranking'],
    queryFn: getRanking,
    initialData: [],
  })

  return (
    <>
      <Box sx={firstSectionStyle}>
        <Container sx={{ width: '100%' }}>
          <Title sx={textStyle}>Creá tu propia liga de Prode ⚽</Title>
          <Text sx={textStyle}>Es gratis. Te creás una cuenta, invitás a tus amigos, y empezás a jugar 👌</Text>
        </Container>
      </Box>
      <Box py="md" sx={secondSectionStyle}>
        <Container sx={{ width: '100%' }}>
          <Grid>
            <Grid.Col xs={12} md={6}>
              <Image p="xs" width="100%" src={fans} />
            </Grid.Col>
            <Grid.Col xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Stack>
                <Text align="center">⚽ Adiviná resultados de partidos de fútbol</Text>
                <Text align="center">👌 Sumá más puntos acertando también los goles</Text>
                <Text align="center">🏆 ¡Coronate campeón de las ligas!</Text>
                <Flex gap="sm" justify="center">
                  <Button color="grape" component={Link} to="#">Ligas</Button>
                  <Button color="grape" component={Link} to="/competitions">Competiciones</Button>
                </Flex>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      <Box py="md" sx={thirdSectionStyle}>
        <Container py="lg">
          <Grid>
            <Grid.Col xs={12} md={6}>
              {areMatchesLoading ? <Loader /> : (
                <NextMatches matches={matches} />
              )}
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              {areParticipantsLoading ? <Loader /> : (
                <ParticipantsRanking participants={participants} />
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
