import type { RawgGame } from "../api/games";

type GameCardProps = {
    game: RawgGame;
    genre: string;
}

export function GameCard({ game, genre }: GameCardProps) {

    console.log(game.platforms);
    return (
        <li className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 my-auto mb-2">
            <div className="aspect-square overflow-hidden">
                <img src={game?.background_image ?? ""} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="px-3 py-2 flex flex-col gap-2">
                <h3 className="m-0 text-white text-xl font-bold leading-tight group-hover:text-purple-400 transition-colors duration-200">
                    {game.name}
                </h3>
                <div className="flex justify-between">
                    <p className="m-0 text-sm text-slate-400 basis-1/2">
                    
                    <span className="group-hover:bg-gradient-to-br from-purple-700/80 to-blue-600/80 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold transition-all duration-300">
                        {genre}
                    </span>
                    </p>
                    <div className="basis-1/2 flex justify-end gap-1">
                        {game?.platforms?.filter((platform) => (platform.platform.name === "PC") || (platform.platform.name === "PlayStation 5") || (platform.platform.name === "Xbox Series S/X")).map((platform) => (
                            <h4 className="bg-slate-700/50 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 rounded-full px-2 py-1 text-sm text-slate-400 group-hover:font-bold">
                                <span className="group-hover:bg-gradient-to-br from-purple-700/80 to-blue-600/80 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                   {platform.platform.name === "PlayStation 5" ? "PS5" : platform.platform.name === "Xbox Series S/X" ? "XBOX" : platform.platform.name}
                                </span>
                            </h4>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    )
}