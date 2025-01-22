import { useState } from 'react';
import { BarChart2, Database, Trophy } from 'lucide-react';

export function Dashboard() {
  const [isConnected] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#CCFF00]">Vezérlőpult</h1>

      {!isConnected ? (
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <Database className="w-12 h-12 text-[#CCFF00] mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Adatbázis Kapcsolódás</h2>
          <p className="text-white/60 mb-4">
            Kattints a "Connect to Supabase" gombra a jobb felső sarokban az adatbázis kapcsolat létrehozásához.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-8 h-8 text-[#CCFF00]" />
              <h2 className="text-lg font-semibold">Mérkőzések</h2>
            </div>
            <p className="text-3xl font-bold mb-2">0</p>
            <p className="text-white/60">Rögzített mérkőzés</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <BarChart2 className="w-8 h-8 text-[#CCFF00]" />
              <h2 className="text-lg font-semibold">Statisztikák</h2>
            </div>
            <p className="text-3xl font-bold mb-2">0%</p>
            <p className="text-white/60">Átlagos pontosság</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-8 h-8 text-[#CCFF00]" />
              <h2 className="text-lg font-semibold">Adatbázis</h2>
            </div>
            <p className="text-3xl font-bold mb-2">Aktív</p>
            <p className="text-white/60">Kapcsolat állapota</p>
          </div>
        </div>
      )}
    </div>
  );
}