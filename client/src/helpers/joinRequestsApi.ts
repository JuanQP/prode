import axios from "axios"

export type UpdateJoinRequestResponse = Pick<JoinRequest, "id" | "accepted">
export type UpdateJoinRequestData = {
  accepted: NonNullable<JoinRequest["accepted"]>
}

export async function updateJoinRequest(id: string, values: UpdateJoinRequestData) {
  const response = await axios.patch<UpdateJoinRequestResponse>(`/api/join-requests/${id}/`, values)
  return response.data
}
