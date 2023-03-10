type Competition = {
  id: number;
  name: string;
  match_count: number;
  league_count: number;
}

type League = {
  id: number;
  name: string;
  is_public: boolean;
  competition: number;
  competition_name: string;
  owner_username: string;
}

type JoinRequest = {
  id: number;
  user: User;
  league: League;
  accepted: boolean | null;
}

type AnsweredJoinRequest = JoinRequest & {
  accepted: boolean;
}

type LeagueDetail = League & {
  participants: Participant[];
}

type MyLeague = LeagueDetail & {
  join_requests: JoinRequest[]
}

type Team = {
  id: number;
  name: string;
  short_name: string;
  image: string;
}

type MatchStatus = "Pendiente" | "Finalizado"

type Match = {
  id: number;
  competition: number;
  team_a: number;
  team_a_detail: Team;
  team_a_score: string;
  team_b: number;
  team_b_detail: Team;
  team_b_score: string;
  datetime: string;
  stadium: string;
  status: MatchStatus;
  description: string;
  detail: string;
}

type CompetitionDetail = {
  id: number;
  name: string;
  leagues: League[];
  matches: Match[];
}

type User = {
  id: number;
  username: string;
  avatar: string | null;
}

type Participant = {
  id: number;
  score: number;
  user: User;
  league: League;
}

type DecodedJWT = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  user: User & {
    is_staff: boolean;
  };
}

type AddPredictionData = {
  match: number;
  team_a_score: string;
  team_b_score: string;
}

type Prediction = {
  id: number;
  match: Match;
  participant: Participant;
  team_a_score: string;
  team_b_score: string;
}
