import { HeartIcon, HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickLinks() {
  return (
    // Outer row: flex, no justify-evenly — first child stays at start; second child grows and spreads its own content.
    <div className="flex items-center lg:basis-1/2">
      {/* First child: logo + GameHub — no flex-grow, stays at start (justify-start by default). */}
      <div className="flex items-center gap-2">
        <Link to="/" className="group">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <span className="bg-gradient-to-r from-purple-900/80 to-blue-800/80 bg-clip-text text-transparent font-bold text-lg lg:text-xl">GH</span>
          </div>
        </Link>
        <div className="hidden md:block font-bold text-xl lg:text-2xl">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GameHub
          </span>
        </div>
      </div>
      {/* Second child: wrapper takes remaining space (flex-1) and uses justify-evenly for Home + Favorites only. */}
      <div className="hidden lg:flex flex-1 justify-evenly items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200">
          <HomeIcon size={20} className="text-slate-300" />
          <div className="text-slate-300 font-medium">Home</div>
        </Link>
        <Link
          to="/favorites"
          className="flex items-center gap-2 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200">
          <HeartIcon size={20} className="text-slate-300" />
          <div className="text-slate-300 font-medium">Favorites</div>
        </Link>
      </div>
    </div>
  );
}
