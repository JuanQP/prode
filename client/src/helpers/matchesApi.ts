import axios from "axios";

export type MatchUpdateValues = Omit<Match, "id" | "team_a_detail" | "team_b_detail" | "detail" | "status" | "team_a_score" | "team_b_score" | "datetime"> & {
  datetime: Date | string;
}
export type FinishMatchValues = Pick<Match, "team_a_score" | "team_b_score">

export async function getNextMatches() {
  const response = await axios.get<Match[]>('/api/matches/next_matches/')
  return response.data
}

export async function getMatch(id: string) {
  const response = await axios.get<Match>(`/api/matches/${id}/`)
  return response.data
}

export async function createMatch(values: MatchUpdateValues) {
  const response = await axios.post<Match>(`/api/matches/`, values)
  return response.data
}

export async function finishMatch(id: string, values: FinishMatchValues) {
  const response = await axios.post<Match>(`/api/matches/${id}/finish/`, values)
  return response.data
}

export async function deleteMatch(id: string) {
  await axios.delete<Match>(`/api/matches/${id}/`)
  return { message: 'Deleted' }
}
