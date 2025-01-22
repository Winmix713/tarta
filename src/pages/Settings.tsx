import { Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#CCFF00]">Beállítások</h1>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <Database className="w-8 h-8 text-[#CCFF00]" />
          <h2 className="text-xl font-semibold">Adatbázis szerkezet kezelése</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#CCFF00]/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Oszlop neve
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Típus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Hossz/Értékek
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Null
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Alapértelmezett
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#CCFF00] uppercase tracking-wider">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#0A0A0A] divide-y divide-[#CCFF00]/20">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">match_id</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">int</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">11</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">NO</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                  <button className="text-[#CCFF00] hover:text-[#CCFF00]/80 mr-2">Módosítás</button>
                  <button className="text-red-500 hover:text-red-400">Törlés</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 bg-[#CCFF00]/20 text-[#CCFF00] rounded-lg hover:bg-[#CCFF00]/30 transition-colors">
            Új oszlop hozzáadása
          </button>
          <button className="px-4 py-2 bg-[#CCFF00]/20 text-[#CCFF00] rounded-lg hover:bg-[#CCFF00]/30 transition-colors">
            SQL Szerkesztő
          </button>
        </div>
      </div>
    </div>
  );
}