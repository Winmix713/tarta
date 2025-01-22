import { Trophy, X, Info, Trash2, Plus } from 'lucide-react';
import type { Match, TeamConfig } from '../types';

interface MatchSelectorProps {
  matches: Match[];
  teamConfig: TeamConfig;
  onAddMatch: () => void;
  onRemoveMatch: (index: number) => void;
  onClearAll: () => void;
  onTeamSelect: (index: number, position: 'home' | 'away', team: string) => void;
  onRunPredictions: () => void;
  hasValidMatch: boolean;
  maxMatches: number;
}

export function MatchSelector({
  matches,
  teamConfig,
  onAddMatch,
  onRemoveMatch,
  onClearAll,
  onTeamSelect,
  onRunPredictions,
  hasValidMatch,
  maxMatches
}: MatchSelectorProps) {
  const canAddMore = matches.length < maxMatches;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#CCFF00]">Select Matches</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
          {canAddMore && (
            <button
              onClick={onAddMatch}
              className="flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/20 text-[#CCFF00] font-medium rounded-lg hover:bg-[#CCFF00]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Match</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-4 mb-4">
          <Info className="w-5 h-5 text-[#CCFF00]" />
          <div className="text-sm text-white/60">
            <p>Select teams for each match. Teams can only be selected once across all matches.</p>
            <p className="mt-1">Maximum matches allowed: {maxMatches}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#CCFF00]/20 transition-colors animate-cardAppear"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#CCFF00]" />
                  <span className="text-sm font-medium text-white/60">
                    Match #{index + 1}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveMatch(index)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
                  aria-label={`Remove match ${index + 1}`}
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <TeamSelect
                  id={`homeTeam${index}`}
                  value={match.homeTeam}
                  onChange={(team) => onTeamSelect(index, 'home', team)}
                  teams={Object.keys(teamConfig)}
                  label="Home Team"
                  usedTeams={matches.flatMap(m => [m.homeTeam, m.awayTeam]).filter(Boolean)}
                  currentTeam={match.homeTeam}
                />
                <div className="text-white/60 font-medium">VS</div>
                <TeamSelect
                  id={`awayTeam${index}`}
                  value={match.awayTeam}
                  onChange={(team) => onTeamSelect(index, 'away', team)}
                  teams={Object.keys(teamConfig)}
                  label="Away Team"
                  usedTeams={matches.flatMap(m => [m.homeTeam, m.awayTeam]).filter(Boolean)}
                  currentTeam={match.awayTeam}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRunPredictions}
        disabled={!hasValidMatch}
        className="w-full mt-8 py-4 bg-[#CCFF00] text-black font-bold rounded-xl hover:bg-[#CCFF00]/90 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
      >
        Run Predictions
      </button>
    </div>
  );
}

interface TeamSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  teams: string[];
  label: string;
  usedTeams: string[];
  currentTeam: string;
}

function TeamSelect({ id, value, onChange, teams, label, usedTeams, currentTeam }: TeamSelectProps) {
  const availableTeams = teams.filter(team => 
    !usedTeams.includes(team) || team === currentTeam
  );

  return (
    <div className="select-wrapper">
      <label htmlFor={id} className="sr-only">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 transition-all"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {availableTeams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
}