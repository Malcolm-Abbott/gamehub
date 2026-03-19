import { MenuIcon, SearchIcon } from 'lucide-react';

export function InputAndMenu() {
  return (
    <>
      <div className="hidden md:block basis-1/2">
        <div className="relative">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      <MenuIcon className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 size-10" />
    </>
  );
}
