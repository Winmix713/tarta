import type { Match, Prediction } from '../types';

export async function generatePredictions(matches: Match[]): Promise<Prediction[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return matches.map(match => ({
    match: {
      home_team: match.homeTeam,
      away_team: match.awayTeam
    },
    confidence: Math.random() * 100,
    head_to_head: {
      home_wins: Math.floor(Math.random() * 10),
      draws: Math.floor(Math.random() * 5),
      away_wins: Math.floor(Math.random() * 10)
    },
    both_teams_to_score: {
      probability: Math.floor(Math.random() * 100)
    },
    home_win_probability: Math.floor(Math.random() * 100),
    expected_goals: {
      home: Math.random() * 3,
      away: Math.random() * 3
    },
    clean_sheet_probability: {
      home: Math.floor(Math.random() * 100),
      away: Math.floor(Math.random() * 100)
    }
  }));
}