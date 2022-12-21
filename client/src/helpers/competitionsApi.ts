import axios from "axios";

export async function getCompetitions() {
  const response = await axios.get<Competition[]>('/api/competitions/')
  return response.data
}

export async function getCompetition(id: string) {
  const response = await axios.get<CompetitionDetail>(`/api/competitions/${id}/`)
  return response.data
}
