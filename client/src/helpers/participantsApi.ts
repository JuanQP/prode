import axios from "axios"

export async function getRanking() {
  const response = await axios.get<Participant[]>('/api/participants/ranking/')
  return response.data
}
