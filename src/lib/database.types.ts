export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          id: string
          league_id: number
          date: string
          home_team: string
          away_team: string
          home_score: number
          away_score: number
          both_teams_scored: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          league_id: number
          date: string
          home_team: string
          away_team: string
          home_score: number
          away_score: number
          both_teams_scored?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          league_id?: number
          date?: string
          home_team?: string
          away_team?: string
          home_score?: number
          away_score?: number
          both_teams_scored?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}