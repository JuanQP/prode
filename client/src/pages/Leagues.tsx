import { SearchableLeagueList } from "@/features/Leagues/SearchableLeagueList";
import { searchLeagues } from "@/helpers/leaguesApi";
import { Button, Container, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Leagues() {

  const [page, setPage] = useState<number>()
  const [search, setSearch] = useState<string>()

  const fetchLeagues = async (search?: string, page?: number) => searchLeagues(search, page)

  const { data: leagues, isLoading } = useQuery({
    queryKey: ['leagues-search', search, page],
    queryFn: () => fetchLeagues(search, page),
    initialData: {
      count: 0,
      next: null,
      previous: null,
      currentPage: 1,
      pages: 1,
      results: [],
    },
    keepPreviousData: true,
  })

  function handleSearch(newSearchText: string) {
    setPage(1)
    setSearch(newSearchText)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
  }

  return (
    <Container pt="md">
      <Title>Ligas</Title>
      <Text my="md">Todas las ligas</Text>
      <Button component={Link} to="/leagues/create" mb="md" leftIcon={<IconPlus />}>
        Crear liga
      </Button>
      <SearchableLeagueList
        showCompetitionName
        searching={isLoading}
        page={leagues.currentPage}
        pages={leagues.pages}
        leagues={leagues.results}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}
