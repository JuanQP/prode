import axios from "axios";

export type PendingJoinRequestResponse = {
  can_join: boolean;
  is_participant: boolean;
  message: string;
}

export type CreateJoinRequestResponse = {
  id: number;
  league: number;
}

export async function getLeague(id: string) {
  const response = await axios.get<LeagueDetail>(`/api/leagues/${id}/`)
  return response.data
}

export async function getCanJoin(id: string) {
  const response = await axios.get<PendingJoinRequestResponse>(`/api/leagues/${id}/can_join/`)
  return response.data
}

export async function createJoinRequest(leagueId: string) {
  const response = await axios.post<CreateJoinRequestResponse>(`/api/join-requests/`, { league: leagueId })
  return response.data
}
