import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { RawgGame } from "../../api/games";
import { fetchGamesByPlatform, fetchPlatformById, RawgPlatform } from "../../api/platform";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { BackToHome } from "../../shared-components/BackToHome";
import { SectionTitle } from "../Home/SectionTitle";
import { MonitorIcon } from "lucide-react";
import { GameCard } from "../../shared-components/GameCard";

export function Platforms() {
    const { platformId } = useParams();
    const [games, setGames] = useState<RawgGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();
    const [platform, setPlatform] = useState<RawgPlatform>();
    

    useEffect(() => {
        async function load() {
            try {
                if (!platformId) return;
                const [games, platform] = await Promise.all([fetchGamesByPlatform(Number(platformId)), fetchPlatformById(Number(platformId))]);
                setGames(games.results);
                setPlatform(platform);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [platformId]);

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <BackToHome />
            <SectionTitle icon={<MonitorIcon className="w-10 h-10 text-purple-400 lg:w-16 lg:h-16" aria-hidden="true" focusable="false" />} title={platform?.name ?? ""} addClass="text-3xl lg:text-5xl" gamesCount={platform?.games_count ?? 0} />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} genre={game?.genres[0]?.name ?? ""} numMoreGenres={game?.genres.length > 1 ? game?.genres.length - 1 : undefined} />
                ))}
            </ul>
        </div>
    )
}