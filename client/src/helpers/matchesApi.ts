import axios from "axios"

export async function getNextMatches() {
  const response = await axios.get<Match[]>('/api/matches/next_matches/')
  return response.data
}
