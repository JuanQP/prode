import axios from "axios"

type UpdatePrediction = Pick<Prediction, "team_a_score" | "team_b_score">

export async function getPrediction(id: string) {
  const response = await axios.get<Prediction>(`/api/predictions/${id}/`)
  return response.data
}

export async function updatePrediction(id: string, data: UpdatePrediction) {
  const response = await axios.patch<UpdatePrediction>(`/api/predictions/${id}/`, data)
  return response.data
}
