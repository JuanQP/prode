import axios from "axios";

export type CreateLeagueData = Pick<League, "name" | "is_public" | "competition">

type CreateLeagueResponse = CreateLeagueData & {
  id: number;
}

export type PendingJoinRequestResponse = {
  can_join: boolean;
  is_participant: boolean;
  message: string;
}

export type CreateJoinRequestResponse = {
  id: number;
  league: number;
}

export type LeagueNextMatchesResponse = Match[]

export type AddPredictionResponse = AddPredictionData & {
  id: number;
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

export async function getLeagueMatches(id: string) {
  const response = await axios.get<Match[]>(`/api/leagues/${id}/matches/`)
  return response.data
}

export async function getLeagueNextMatches(id: string) {
  const response = await axios.get<LeagueNextMatchesResponse>(`/api/leagues/${id}/next_matches/`)
  return response.data
}

export async function getLeaguePredictions(id: string) {
  const response = await axios.get<Prediction[]>(`/api/leagues/${id}/my_predictions/`)
  return response.data
}

export async function addPrediction(id: string, prediction: AddPredictionData) {
  const response = await axios.post<AddPredictionResponse>(`/api/leagues/${id}/add_prediction/`, prediction)
  return response.data
}

export async function getLeagues() {
  const response = await axios.get<League[]>(`/api/leagues/`)
  return response.data
}

export async function createLeague(values: CreateLeagueData) {
  const response = await axios.post<CreateLeagueResponse>(`/api/leagues/`, values)
  return response.data
}
