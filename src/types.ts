export interface Match {
  homeTeam: string;
  awayTeam: string;
}

export interface TeamConfig {
  [key: string]: {
    logo: string;
    color: string;
  };
}

export interface Prediction {
  match: {
    home_team: string;
    away_team: string;
  };
  confidence: number;
  head_to_head: {
    home_wins: number;
    draws: number;
    away_wins: number;
  };
  both_teams_to_score: {
    probability: number;
  };
  home_win_probability: number;
  expected_goals: {
    home: number;
    away: number;
  };
  clean_sheet_probability: {
    home: number;
    away: number;
  };
}