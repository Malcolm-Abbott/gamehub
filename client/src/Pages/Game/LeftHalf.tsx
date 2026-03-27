import type { RawgGameDetail } from "../../api/games";
import type { RawgGameMovie } from "../../api/trailers";
import { RightHalf } from "./RightHalf";
import { WatchTrailerTitle } from "./WatchTrailerTitle";
import { Trailer } from "./Trailer";
import { GameImage } from "./GameImage";

interface LeftHalfProps {
    game: RawgGameDetail;
    trailers: RawgGameMovie[];
}

export function LeftHalf({ game, trailers }: LeftHalfProps) {
    const trailerUrl = trailers[0]?.data["max"] ?? trailers[0]?.data["480"];
    const preview = trailers[0]?.preview ?? "";

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <GameImage src={game?.background_image ?? ""} alt={game?.name} />
            <div className="lg:hidden">
                <RightHalf />
            </div>
            <div className="p-4 flex flex-col gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
                <WatchTrailerTitle />
                <Trailer trailerUrl={trailerUrl} preview={preview} />
            </div>
        </div>
    );
}
