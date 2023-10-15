import axios from "axios";
import { BACKEND_URL } from "./constants";

export type CompetitionUpdateValues = Pick<Competition, "name">
type CompetitionResponse = CompetitionUpdateValues & {
  id: number
}

export async function getCompetitions() {
  const response = await axios.get<Competition[]>(`${BACKEND_URL}/api/competitions/`)
  return response.data
}

export async function getCompetition(id: string) {
  const response = await axios.get<CompetitionDetail>(`${BACKEND_URL}/api/competitions/${id}/`)
  return response.data
}

export async function createCompetition(values: CompetitionUpdateValues) {
  const response = await axios.post<CompetitionResponse>(`${BACKEND_URL}/api/competitions/`, values)
  return response.data
}

export async function updateCompetition(id: string, values: CompetitionUpdateValues) {
  const response = await axios.patch<CompetitionResponse>(`${BACKEND_URL}/api/competitions/${id}/`, values)
  return response.data
}

export async function deleteCompetition(id: string) {
  await axios.delete<CompetitionResponse>(`${BACKEND_URL}/api/competitions/${id}/`)
  return { message: 'Deleted' }
}

export async function uploadMatchesFile(id: string | number, file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post<{message: string}>(`${BACKEND_URL}/api/competitions/${id}/csv_upload/`, formData)
  return response.data
}
