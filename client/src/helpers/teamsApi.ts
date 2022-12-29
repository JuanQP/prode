import axios from "axios"

export type TeamUpdateValues = Omit<Team, "id">

export async function getTeams() {
  const response = await axios.get<Team[]>('/api/teams/')
  return response.data
}

export async function getTeam(id: string) {
  const response = await axios.get<Team>(`/api/teams/${id}/`)
  return response.data
}

export async function createTeam(values: TeamUpdateValues) {
  const response = await axios.post<Team>(`/api/teams/`, values)
  return response.data
}

export async function updateTeam(id: string, values: TeamUpdateValues) {
  const response = await axios.patch<Team>(`/api/teams/${id}/`, values)
  return response.data
}

export async function deleteTeam(id: string) {
  await axios.delete<Team>(`/api/teams/${id}/`)
  return { message: 'Deleted' }
}
