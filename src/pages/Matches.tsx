import { useState } from 'react';
import { MatchSelector } from '../components/MatchSelector';
import { PredictionResults } from '../components/PredictionResults';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { generatePredictions } from '../utils/predictions';
import { teamConfig } from '../data/teams';
import type { Match, Prediction } from '../types';

export function Matches() {
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([{ homeTeam: '', awayTeam: '' }]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const addMatch = () => {
    setSelectedMatches(prev => [...prev, { homeTeam: '', awayTeam: '' }]);
  };

  const removeMatch = (index: number) => {
    setSelectedMatches(prev => prev.filter((_, i) => i !== index));
    setShowResults(false);
  };

  const clearAllMatches = () => {
    setSelectedMatches([{ homeTeam: '', awayTeam: '' }]);
    setShowResults(false);
    setPredictions([]);
  };

  const handleTeamSelect = (index: number, position: 'home' | 'away', team: string) => {
    setSelectedMatches(prev => 
      prev.map((match, i) => 
        i === index 
          ? { ...match, [position === 'home' ? 'homeTeam' : 'awayTeam']: team }
          : match
      )
    );
  };

  const runPredictions = async () => {
    const validMatches = selectedMatches.filter(match => match.homeTeam && match.awayTeam);
    if (validMatches.length === 0) return;

    setIsLoading(true);
    try {
      const newPredictions = await generatePredictions(validMatches);
      setPredictions(newPredictions);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating predictions:', error);
      alert('Failed to generate predictions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const hasValidMatch = selectedMatches.some(match => match.homeTeam && match.awayTeam);

  return (
    <div>
      <MatchSelector
        matches={selectedMatches}
        teamConfig={teamConfig}
        onAddMatch={addMatch}
        onRemoveMatch={removeMatch}
        onClearAll={clearAllMatches}
        onTeamSelect={handleTeamSelect}
        onRunPredictions={runPredictions}
        hasValidMatch={hasValidMatch}
        maxMatches={8}
      />

      {showResults && (
        <PredictionResults predictions={predictions} teamConfig={teamConfig} />
      )}

      <LoadingSpinner isVisible={isLoading} />
    </div>
  );
}