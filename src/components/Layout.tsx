import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Settings, User, Home, FolderRoot as Football, BarChart2, Database } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#CCFF00]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="text-xl font-bold flex items-center gap-2">
                <button 
                  aria-label="Toggle menu" 
                  className="focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 rounded-lg p-2"
                >
                  <Menu className="w-6 h-6 text-[#CCFF00]" />
                </button>
                <span className="sr-only">WinMix</span>
                win<span className="text-[#CCFF00]">mix</span>.hu
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/"
                  className={`text-white/60 hover:text-[#CCFF00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 rounded-lg px-2 py-1 ${
                    location.pathname === '/' ? 'text-[#CCFF00]' : ''
                  }`}
                >
                  Vezérlőpult
                </Link>
                <Link
                  to="/matches"
                  className={`text-white/60 hover:text-[#CCFF00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 rounded-lg px-2 py-1 ${
                    location.pathname === '/matches' ? 'text-[#CCFF00]' : ''
                  }`}
                >
                  Mérkőzések
                </Link>
                <Link
                  to="/statistics"
                  className={`text-white/60 hover:text-[#CCFF00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 rounded-lg px-2 py-1 ${
                    location.pathname === '/statistics' ? 'text-[#CCFF00]' : ''
                  }`}
                >
                  Statisztikák
                </Link>
                <Link
                  to="/settings"
                  className={`text-white/60 hover:text-[#CCFF00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 rounded-lg px-2 py-1 ${
                    location.pathname === '/settings' ? 'text-[#CCFF00]' : ''
                  }`}
                >
                  Beállítások
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button 
                aria-label="Notifications" 
                className="p-2 rounded-full hover:bg-white/5 transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
              >
                <Bell className="w-5 h-5 text-white/60" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#CCFF00] rounded-full" />
              </button>
              <button 
                aria-label="Settings" 
                className="p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
              >
                <Settings className="w-5 h-5 text-white/60" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-white/60">Premium User</div>
                </div>
                <button 
                  aria-label="User profile" 
                  className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
                >
                  <User className="w-5 h-5 text-[#CCFF00]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md border-t border-[#CCFF00]/20 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-around">
            <Link to="/" className="flex flex-col items-center text-white/60 hover:text-[#CCFF00] transition-colors">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Vezérlőpult</span>
            </Link>
            <Link to="/matches" className="flex flex-col items-center text-white/60 hover:text-[#CCFF00] transition-colors">
              <Football className="w-6 h-6" />
              <span className="text-xs mt-1">Mérkőzések</span>
            </Link>
            <Link to="/statistics" className="flex flex-col items-center text-white/60 hover:text-[#CCFF00] transition-colors">
              <BarChart2 className="w-6 h-6" />
              <span className="text-xs mt-1">Statisztikák</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center text-white/60 hover:text-[#CCFF00] transition-colors">
              <Database className="w-6 h-6" />
              <span className="text-xs mt-1">Beállítások</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}