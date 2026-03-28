type GameSectionPanelProps = { 
    children: React.ReactNode 
};

export function GameSectionPanel({ children }: GameSectionPanelProps) {
  return (
    <div className="flex flex-col gap-4 px-6 py-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
      {children}
    </div>
  );
}