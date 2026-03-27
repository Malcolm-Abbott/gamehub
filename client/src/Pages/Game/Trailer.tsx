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
        <div className={`relative aspect-video overflow-hidden rounded-2xl border border-slate-700/10${trailerUrl ? " cursor-pointer" : ""}`}>
            <>
                {trailerUrl ? (
                    <video
                        src={trailerUrl}
                        poster={preview || ""}
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
    )
}