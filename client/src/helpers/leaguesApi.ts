import axios from "axios"

export async function getLeague(id: string) {
  const response = await axios.get<LeagueDetail>(`/api/leagues/${id}/`)
  return response.data
}
