import React, { useState } from 'react';
import { AlertCircle, Trophy, Filter, Download, Share2, Plus, X, Settings2, Info, Database, LayoutDashboard, ChevronRight } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  color: string;
  weight: number;
  recentForm: string;
  strength: number;
  stats: {
    goalsScored: number;
    goalsConceded: number;
    cleanSheets: number;
    wins: number;
    winPercentage: string;
  };
}

interface Match {
  homeTeam: Team | null;
  awayTeam: Team | null;
}

interface Prediction {
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  bothTeamsToScoreProb: number;
  predictedWinner: string;
  confidence: number;
  modelPredictions: {
    randomForest: string;
    poisson: {
      homeGoals: number;
      awayGoals: number;
    };
    elo: {
      homeWinProb: number;
      drawProb: number;
      awayWinProb: number;
    };
  };
}

const TEAMS: Team[] = [
  {
    id: 'chelsea',
    name: 'Chelsea',
    shortName: 'CHE',
    logoUrl: 'https://www.winmix.hu/images/chelsea.png',
    color: '#034694',
    weight: 1.0,
    recentForm: 'WWDWL',
    strength: 85,
    stats: {
      goalsScored: 45,
      goalsConceded: 30,
      cleanSheets: 12,
      wins: 18,
      winPercentage: '60.00'
    }
  },
  {
    id: 'liverpool',
    name: 'Liverpool',
    shortName: 'LIV',
    logoUrl: 'https://www.winmix.hu/images/liverpool.png',
    color: '#C8102E',
    weight: 1.0,
    recentForm: 'WWWDW',
    strength: 88,
    stats: {
      goalsScored: 52,
      goalsConceded: 25,
      cleanSheets: 15,
      wins: 20,
      winPercentage: '66.67'
    }
  }
];

function App() {
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'predictions' | 'control'>('predictions');
  const [showSettings, setShowSettings] = useState(false);

  const addMatch = () => {
    if (selectedMatches.length < 8) {
      setSelectedMatches([...selectedMatches, { homeTeam: null, awayTeam: null }]);
    } else {
      setError('Maximum number of matches reached');
    }
  };

  const removeMatch = (index: number) => {
    setSelectedMatches(selectedMatches.filter((_, i) => i !== index));
  };

  const clearAllMatches = () => {
    setSelectedMatches([]);
    setPredictions([]);
  };

  const handleTeamSelect = (index: number, position: 'home' | 'away', teamId: string) => {
    const updatedMatches = [...selectedMatches];
    const team = TEAMS.find(t => t.id === teamId) || null;
    
    if (position === 'home') {
      updatedMatches[index].homeTeam = team;
    } else {
      updatedMatches[index].awayTeam = team;
    }
    
    setSelectedMatches(updatedMatches);
  };

  const runPredictions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const validMatches = selectedMatches.filter(match => match.homeTeam && match.awayTeam);
      
      if (validMatches.length === 0) {
        throw new Error('Please select at least one match');
      }

      const predictions = await Promise.all(
        validMatches.map(async match => {
          const response = await fetch('https://winmix.hu/api/2/combined_matches_api.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              home_team: match.homeTeam?.id,
              away_team: match.awayTeam?.id
            })
          });

          if (!response.ok) {
            throw new Error('Failed to fetch prediction');
          }

          return response.json();
        })
      );

      setPredictions(predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#CCFF00]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="text-xl font-bold">
                win<span className="text-[#CCFF00]">mix</span>.hu
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setActiveTab('predictions')}
                  className={`flex items-center gap-2 ${activeTab === 'predictions' ? 'text-[#CCFF00]' : 'text-white/60 hover:text-[#CCFF00]'} transition-colors`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Predictions</span>
                </button>
                <button 
                  onClick={() => setActiveTab('control')}
                  className={`flex items-center gap-2 ${activeTab === 'control' ? 'text-[#CCFF00]' : 'text-white/60 hover:text-[#CCFF00]'} transition-colors`}
                >
                  <Database className="w-4 h-4" />
                  <span>Control Panel</span>
                </button>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 text-white/60 hover:text-[#CCFF00] transition-colors"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSettings(true)}
                className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <Settings2 className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Prediction Control Panel */}
        <div className="bg-white/5 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Prediction Control Panel</h2>
              <p className="text-sm text-white/60 mt-1">Manage and analyze your predictions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60">Prediction Model</label>
              <select className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white">
                <option value="combined">Combined Analysis</option>
                <option value="statistical">Statistical</option>
                <option value="ml">Machine Learning</option>
                <option value="historical">Historical Data</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60">Time Range</label>
              <select className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white">
                <option value="all">All Time</option>
                <option value="1y">Last Year</option>
                <option value="6m">Last 6 Months</option>
                <option value="3m">Last 3 Months</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60">Confidence Level</label>
              <select className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white">
                <option value="all">All Predictions</option>
                <option value="high">High Confidence (80%+)</option>
                <option value="medium">Medium Confidence (50-80%)</option>
                <option value="low">Low Confidence (Below 50%)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <button 
              onClick={runPredictions}
              disabled={isLoading || selectedMatches.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[#CCFF00] text-black font-medium rounded-lg hover:bg-[#CCFF00]/90 transition-colors disabled:bg-gray-600 disabled:text-gray-400"
            >
              {isLoading ? 'Processing...' : 'Run Predictions'}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex-1" />

            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Match Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#CCFF00]">Select Matches</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={clearAllMatches}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
              <button 
                onClick={addMatch}
                className="flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/20 text-[#CCFF00] font-medium rounded-lg hover:bg-[#CCFF00]/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Match</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <Info className="w-5 h-5 text-[#CCFF00]" />
              <p className="text-sm text-white/60">
                Select teams for each match. Teams can only be selected once across all matches.
              </p>
            </div>

            <div className="space-y-4">
              {selectedMatches.map((match, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#CCFF00]" />
                      <span className="text-sm font-medium text-white/60">Match #{index + 1}</span>
                    </div>
                    <button 
                      onClick={() => removeMatch(index)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                  </div>

                  <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <select
                      value={match.homeTeam?.id || ''}
                      onChange={(e) => handleTeamSelect(index, 'home', e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white"
                    >
                      <option value="">Select home team</option>
                      {TEAMS.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name} ({team.shortName})
                        </option>
                      ))}
                    </select>
                    <div className="text-white/60 font-medium">VS</div>
                    <select
                      value={match.awayTeam?.id || ''}
                      onChange={(e) => handleTeamSelect(index, 'away', e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white"
                    >
                      <option value="">Select away team</option>
                      {TEAMS.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name} ({team.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {match.homeTeam && match.awayTeam && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm font-medium">{match.homeTeam.strength}</div>
                          <div className="text-xs text-white/60">Strength</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{match.homeTeam.recentForm}</div>
                          <div className="text-xs text-white/60">Form</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#CCFF00]">{match.homeTeam.stats.winPercentage}%</div>
                          <div className="text-xs text-white/60">Win Rate</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {predictions.length > 0 && (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#CCFF00]">Prediction Results</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {predictions.map((prediction, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center px-4 py-2 bg-[#CCFF00]/10 rounded-xl">
                        <div className="text-2xl font-bold text-[#CCFF00]">
                          {prediction.confidence.toFixed(2)}%
                        </div>
                        <div className="text-sm text-white/60">Confidence</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white/60">Expected Goals</span>
                          <span className="text-sm font-medium">
                            {prediction.homeExpectedGoals.toFixed(2)} - {prediction.awayExpectedGoals.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#CCFF00]"
                            style={{ width: `${(prediction.homeExpectedGoals / (prediction.homeExpectedGoals + prediction.awayExpectedGoals)) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white/60">Both Teams to Score</span>
                          <span className="text-sm font-medium">{prediction.bothTeamsToScoreProb.toFixed(2)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#CCFF00]"
                            style={{ width: `${prediction.bothTeamsToScoreProb}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-medium mb-3">Model Predictions</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-white/60 mb-2">Random Forest</div>
                            <div className="text-lg font-medium">{prediction.modelPredictions.randomForest}</div>
                          </div>
                          <div>
                            <div className="text-sm text-white/60 mb-2">Poisson</div>
                            <div className="text-lg font-medium">
                              {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#141414] rounded-2xl w-full max-w-lg mx-4 p-6 relative">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-[#CCFF00] mb-6">Settings</h2>
            
            <div className="space-y-6">
              {/* General Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">General</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <button className="w-12 h-6 bg-[#CCFF00]/20 rounded-full relative">
                      <span className="absolute w-5 h-5 bg-[#CCFF00] rounded-full left-0.5 top-0.5"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <button className="w-12 h-6 bg-[#CCFF00]/20 rounded-full relative">
                      <span className="absolute w-5 h-5 bg-[#CCFF00] rounded-full right-0.5 top-0.5"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Prediction Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Predictions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Default Prediction Model</label>
                    <select className="w-full p-2 bg-[#0A0A0A] border border-[#CCFF00]/20 rounded-lg text-white">
                      <option>Combined Analysis</option>
                      <option>Statistical</option>
                      <option>Machine Learning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Confidence Threshold</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="75"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Account</h3>
                <div className="space-y-4">
                  <button className="w-full px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;