import type { RawgGameDetail } from "../../api/games";
import type { RawgGameMovie } from "../../api/trailers";
import { RightHalf } from "./RightHalf";
import { WatchTrailerTitle } from "./WatchTrailerTitle";
import { Trailer } from "./Trailer";
import { GameImage } from "./GameImage";
import { GameSectionPanel } from "./GameSectionPanel";

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
                <RightHalf game={game} />
            </div>
            <GameSectionPanel>
                <WatchTrailerTitle />
                <Trailer trailerUrl={trailerUrl} preview={preview} />
            </GameSectionPanel>
        </div>
    );
}
