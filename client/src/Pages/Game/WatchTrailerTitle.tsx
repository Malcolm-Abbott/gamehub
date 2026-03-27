import { PlayIcon } from "lucide-react";

export function WatchTrailerTitle() {
    return (
        <div className="flex items-center gap-4">
            <PlayIcon className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Watch Trailer</h2>
        </div>
    )
}