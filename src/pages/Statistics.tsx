import { useState } from 'react';
import { teamConfig } from '../data/teams';

export function Statistics() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#CCFF00]">Statisztikák</h1>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div>
            <label htmlFor="homeTeam" className="block text-sm font-medium text-white/60 mb-2">
              Hazai csapat
            </label>
            <select
              id="homeTeam"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 transition-all"
            >
              <option value="">Válassz csapatot</option>
              {Object.keys(teamConfig).map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="awayTeam" className="block text-sm font-medium text-white/60 mb-2">
              Vendég csapat
            </label>
            <select
              id="awayTeam"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="w-full p-3 bg-[#141414] border border-[#CCFF00]/20 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 transition-all"
            >
              <option value="">Válassz csapatot</option>
              {Object.keys(teamConfig).map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {homeTeam && awayTeam ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">{homeTeam} statisztikák</h3>
                <p>Forma index: 0.00%</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{awayTeam} statisztikák</h3>
                <p>Forma index: 0.00%</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Közös statisztikák</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Összes mérkőzés</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Mindkét csapat gólt szerzett</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Átlag gólok</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Egymás elleni eredmények</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Hazai győzelmek</p>
                  <p className="text-2xl font-bold">0 (0%)</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Döntetlen</p>
                  <p className="text-2xl font-bold">0 (0%)</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-white/60">Vendég győzelmek</p>
                  <p className="text-2xl font-bold">0 (0%)</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-white/60 py-8">
            Válassz ki két csapatot a statisztikák megtekintéséhez
          </div>
        )}
      </div>
    </div>
  );
}