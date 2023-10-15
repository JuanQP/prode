import axios from "axios"
import { BACKEND_URL } from "./constants"

export type TeamUpdateValues = Omit<Team, "id">

export async function getTeams() {
  const response = await axios.get<Team[]>(`${BACKEND_URL}/api/teams/`)
  return response.data
}

export async function getTeam(id: string) {
  const response = await axios.get<Team>(`${BACKEND_URL}/api/teams/${id}/`)
  return response.data
}

export async function createTeam(values: TeamUpdateValues) {
  const response = await axios.post<Team>(`${BACKEND_URL}/api/teams/`, values)
  return response.data
}

export async function updateTeam(id: string, values: TeamUpdateValues) {
  const response = await axios.patch<Team>(`${BACKEND_URL}/api/teams/${id}/`, values)
  return response.data
}

export async function deleteTeam(id: string) {
  await axios.delete<Team>(`${BACKEND_URL}/api/teams/${id}/`)
  return { message: 'Deleted' }
}

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post<{message: string}>(`${BACKEND_URL}/api/teams/csv_upload/`, formData)
  return response.data
}
