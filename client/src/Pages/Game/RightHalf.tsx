import type { RawgGameDetail } from "../../api/games";
import { GameTitle } from "./GameTitle";
import { GameGenres } from "./GameGenres";
import { GamePlatforms } from "./GamePlatforms";
import { GameSectionPanel } from "./GameSectionPanel";
import { VisitOfficial } from "./VisitOfficial";

type RightHalfProps = {
    game: RawgGameDetail;
}

export function RightHalf({ game }: RightHalfProps) {
    return (
        <div className="flex flex-col gap-6 lg:gap-8 lg:py-3 lg:px-8">
            <GameTitle name={game?.name ?? "Game Name Not Found"} />
            <GameGenres genres={game?.genres ?? []} />
            <GamePlatforms platforms={game?.platforms ?? []} />
            <GameSectionPanel>
                <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Description</h2>
                <p className="line-clamp-4 leading-relaxed text-white/90 md:line-clamp-5">{game?.description_raw ?? "Game Description Not Found"}</p>
            </GameSectionPanel>
            <GameSectionPanel>
                <VisitOfficial website={game?.website ?? "#"} name={game?.name ?? "Game Name Not Found"} />
            </GameSectionPanel>
        </div>
    )
}