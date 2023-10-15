import axios from "axios"
import { BACKEND_URL } from "./constants"

export async function getRanking() {
  const response = await axios.get<Participant[]>(`${BACKEND_URL}/api/participants/ranking/`)
  return response.data
}

export async function getMyParticipations() {
  const response = await axios.get<Participant[]>(`${BACKEND_URL}/api/participants/my_participations/`)
  return response.data
}
