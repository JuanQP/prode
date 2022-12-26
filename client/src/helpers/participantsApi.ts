import axios from "axios"

export async function getRanking() {
  const response = await axios.get<Participant[]>('/api/participants/ranking/')
  return response.data
}

export async function getMyParticipations() {
  const response = await axios.get<Participant[]>('/api/participants/my_participations/')
  return response.data
}
