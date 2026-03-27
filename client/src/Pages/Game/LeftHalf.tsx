import type { RawgGameDetail } from "../../api/games";
import { PlayIcon } from "lucide-react";
import type { RawgGameMovie } from "../../api/trailers";
import { useState, useRef } from "react";
import { RightHalf } from "./RightHalf";

interface LeftHalfProps {
    game: RawgGameDetail;
    trailers: RawgGameMovie[];
}

export function LeftHalf({ game, trailers }: LeftHalfProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const trailerUrl = trailers[0]?.data["max"] ?? trailers[0]?.data["480"];

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <div className="aspect-rectangle overflow-hidden rounded-2xl border border-slate-700/50">
                <img src={game?.background_image ?? ""} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <div className="lg:hidden">
                <RightHalf />
            </div>
            <div className="p-4 flex flex-col gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-4">
                    <PlayIcon className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Watch Trailer</h2>
                </div>
                <div className={`relative aspect-video overflow-hidden rounded-2xl border border-slate-700/10${trailerUrl ? " cursor-pointer" : ""}`}>
                    <>
                        {trailerUrl ? (
                            <video
                                src={trailerUrl}
                                poster={trailers[0]?.preview ?? ""}
                                className="w-full h-full object-cover"
                                controls
                                ref={videoRef}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-slate-900/80" aria-hidden />
                        )}
                        {!isPlaying && (
                            <button
                                type="button"
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400${trailerUrl ? " cursor-pointer" : ""}`}
                                onClick={trailerUrl ? () => void videoRef.current?.play() : undefined}
                                aria-label={trailerUrl ? "Play trailer" : "Trailer unavailable"}
                            >
                                {trailerUrl ? (
                                    <PlayIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:w-10" aria-hidden="true" focusable="false" />
                                ) : (
                                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center font-bold text-transparent md:text-xl">
                                        Trailer Unavailable
                                    </span>
                                )}
                            </button>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}
