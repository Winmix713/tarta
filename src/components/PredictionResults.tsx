import type { Prediction, TeamConfig } from '../types';

interface PredictionResultsProps {
  predictions: Prediction[];
  teamConfig: TeamConfig;
}

export function PredictionResults({ predictions, teamConfig }: PredictionResultsProps) {
  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Prediction Results</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {predictions.map((prediction, index) => (
          <PredictionCard
            key={index}
            prediction={prediction}
            teamConfig={teamConfig}
          />
        ))}
      </div>
    </div>
  );
}

interface PredictionCardProps {
  prediction: Prediction;
  teamConfig: TeamConfig;
}

function PredictionCard({ prediction, teamConfig }: PredictionCardProps) {
  const { match, confidence, head_to_head, both_teams_to_score, home_win_probability, expected_goals, clean_sheet_probability } = prediction;

  return (
    <div className="prediction-card bg-white/5 rounded-2xl p-6 animate-cardAppear">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <TeamDisplay
            team={match.home_team}
            config={teamConfig[match.home_team]}
          />
          <div className="text-2xl font-bold">VS</div>
          <TeamDisplay
            team={match.away_team}
            config={teamConfig[match.away_team]}
          />
        </div>
        <div className="text-center px-4 py-2 bg-[#CCFF00]/10 rounded-xl">
          <div className="text-2xl font-bold text-[#CCFF00]">
            {confidence.toFixed(2)}%
          </div>
          <div className="text-sm text-white/60">Confidence</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatBox label="Home Wins" value={head_to_head.home_wins} />
        <StatBox label="Draws" value={head_to_head.draws} />
        <StatBox label="Away Wins" value={head_to_head.away_wins} />
      </div>

      <div className="space-y-4">
        <ProgressBar
          label="Both Teams to Score"
          value={both_teams_to_score.probability}
        />
        <ProgressBar
          label="Home Win"
          value={home_win_probability}
        />

        <div className="mt-6 p-4 bg-white/5 rounded-xl">
          <h3 className="text-lg font-medium mb-3">Detailed Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailStat
              label="Expected Goals"
              home={expected_goals.home.toFixed(2)}
              away={expected_goals.away.toFixed(2)}
            />
            <DetailStat
              label="Clean Sheet Probability"
              home={`${clean_sheet_probability.home}%`}
              away={`${clean_sheet_probability.away}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TeamDisplayProps {
  team: string;
  config: {
    logo: string;
    color: string;
  };
}

function TeamDisplay({ team, config }: TeamDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={config.logo}
        alt={`${team} logo`}
        className="w-12 h-12 mb-2"
        loading="lazy"
      />
      <span className="text-sm" style={{ color: config.color }}>
        {team}
      </span>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: number;
}

function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="text-center p-3 bg-white/5 rounded-xl">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
}

function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#CCFF00] transition-all duration-500"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

interface DetailStatProps {
  label: string;
  home: string;
  away: string;
}

function DetailStat({ label, home, away }: DetailStatProps) {
  return (
    <div>
      <div className="text-sm text-white/60 mb-2">{label}</div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{home}</span>
        <span className="text-lg font-medium">{away}</span>
      </div>
    </div>
  );
}