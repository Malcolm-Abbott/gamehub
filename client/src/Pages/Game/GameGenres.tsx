import { ShapesIcon } from "lucide-react";

type GameGenresProps = {
    genres: { id: number; name: string; slug: string }[];
}

export function GameGenres({ genres }: GameGenresProps) {
    return (
        <div className="flex gap-2">
            <ShapesIcon className="w-8 h-8 text-pink-300/80 my-auto" aria-hidden="true" focusable="false" />
            <ul className="flex flex-wrap flex-1 gap-2 cursor-default">
                {genres?.map((genre) => (
                    <li key={genre.id} className="sm:text-lg font-medium bg-pink-700/10 border border-purple-500/50 rounded-md px-3 py-1">
                        <span className="bg-gradient-to-br from-purple-700/80 to-blue-600/80 bg-clip-text text-transparent font-bold">{genre.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}