import { PlayIcon } from "lucide-react";
import { useState, useRef } from "react";

type TrailerProps = {
    trailerUrl: string;
    preview: string;
}

export function Trailer({ trailerUrl, preview }: TrailerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className={`group relative aspect-video overflow-hidden rounded-2xl border border-slate-700/10${trailerUrl ? " cursor-pointer" : ""}`}>
            <>
                {trailerUrl ? (
                    <video
                        src={trailerUrl}
                        poster={preview || ""}
                        className="group w-full h-full object-cover"
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
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2${trailerUrl ? " cursor-pointer" : ""}`}
                        onClick={trailerUrl ? () => void videoRef.current?.play() : undefined}
                        aria-label={trailerUrl ? "Play trailer" : "Trailer unavailable"}
                    >
                        {trailerUrl ? (
                            <div className="flex items-center justify-center hidden sm:block bg-gradient-to-br from-slate-700/90 via-slate-900 to-slate-700/90 border border-slate-900/20 rounded-full p-2 group-hover:bg-gradient-to-br group-hover:from-purple-900/80 group-hover:via-slate-900/80 group-hover:to-blue-800/80 transition-all duration-200">
                                <PlayIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:w-10 text-violet-600 group-hover:text-blue-600 transition-colors duration-450" aria-hidden="true" focusable="false" />
                            </div>
                        ) : (
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center font-bold text-transparent text-xl sm:text-2xl">
                                Trailer Unavailable
                            </span>
                        )}
                    </button>
                )}
            </>
        </div>
    )
}