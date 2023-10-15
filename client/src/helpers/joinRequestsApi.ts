import axios from "axios"
import { BACKEND_URL } from "./constants"

export type UpdateJoinRequestResponse = Pick<JoinRequest, "id" | "accepted">
export type UpdateJoinRequestData = {
  accepted: NonNullable<JoinRequest["accepted"]>
}

export async function updateJoinRequest(id: string, values: UpdateJoinRequestData) {
  const response = await axios.patch<UpdateJoinRequestResponse>(`${BACKEND_URL}/api/join-requests/${id}/`, values)
  return response.data
}
