import { Box, Flex, Pagination, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { LeagueList, Props as LeagueListProps } from "./LeagueList";

interface Props extends LeagueListProps {
  page: number;
  pages: number;
  searching: boolean;
  onPageChange: (page: number) => void;
  onSearch: (search: string) => void;
}

interface SearchForm {
  search: string;
}

export function SearchableLeagueList(props: Props) {

  const { page, pages, searching, onSearch, onPageChange, ...leagueListProps } = props
  const { register, handleSubmit: handleFormSubmit } = useForm<SearchForm>({
    defaultValues: { search: '' },
  })

  function handleSubmit(values: SearchForm) {
    onSearch(values.search)
  }

  return (
    <Box>
      <Box component="form" onSubmit={handleFormSubmit(handleSubmit)}>
        <TextInput
          disabled={searching}
          label="Búsqueda"
          placeholder="Buscar por liga y competencia..."
          inputMode="search"
          enterKeyHint="search"
          {...register('search')}
        />
      </Box>
      <LeagueList {...leagueListProps} />
      <Flex justify="center">
        <Pagination page={page} total={pages} onChange={onPageChange} />
      </Flex>
    </Box>
  )
}
