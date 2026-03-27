import type { RawgGameDetail } from "../../api/games";
import { PlayIcon } from "lucide-react";
import type { RawgGameMovie } from "../../api/trailers";
import { useState, useRef } from "react";

interface LeftHalfProps {
    game: RawgGameDetail;
    trailers: RawgGameMovie[];
}

export function LeftHalf({ game, trailers }: LeftHalfProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);


    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <div className="aspect-rectangle overflow-hidden rounded-2xl border border-slate-700/50">
                <img src={game?.background_image ?? ""} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-4">
                    <PlayIcon className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Watch trailers</h2>
                </div>
                <div className="video-wrapper relative aspect-video overflow-hidden rounded-2xl cursor-pointer border border-slate-700/50">
                    <video src={trailers[0]?.data['max'] ?? trailers[0]?.data['480']}
                        poster={trailers[0]?.preview ?? ""}
                        className="w-full h-full object-cover"
                        controls
                        ref={videoRef}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)} />
                    {!isPlaying && (
                        <button
                            type="button"
                            className="play-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400 cursor-pointer"
                            onClick={() => void videoRef.current?.play()}
                            aria-label="Play trailer"
                        >
                            <PlayIcon className="w-8 h-8" aria-hidden="true" focusable="false" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}