/*
  # Create matches table

  1. New Tables
    - `matches`
      - `id` (uuid, primary key)
      - `league_id` (integer)
      - `date` (timestamp)
      - `home_team` (text)
      - `away_team` (text)
      - `home_score` (integer)
      - `away_score` (integer)
      - `both_teams_scored` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `matches` table
    - Add policies for authenticated users to:
      - Read all matches
      - Create matches
      - Update their own matches
      - Delete their own matches
*/

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id integer NOT NULL,
  date timestamptz NOT NULL,
  home_team text NOT NULL,
  away_team text NOT NULL,
  home_score integer NOT NULL DEFAULT 0,
  away_score integer NOT NULL DEFAULT 0,
  both_teams_scored boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Matches are viewable by everyone"
  ON matches
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create matches"
  ON matches
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own matches"
  ON matches
  FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own matches"
  ON matches
  FOR DELETE
  USING (auth.uid() = created_by);

-- Indexes
CREATE INDEX matches_date_idx ON matches(date DESC);
CREATE INDEX matches_teams_idx ON matches(home_team, away_team);
CREATE INDEX matches_league_idx ON matches(league_id);