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
}

type CompetitionDetail = {
  id: number;
  name: string;
  leagues: League[];
  matches: Match[];
}
