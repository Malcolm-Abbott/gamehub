import { useParams } from "react-router-dom";
import { fetchGamesByGenre, RawgGenre, fetchGameGenres } from "../../api/genres";
import { useState, useEffect } from "react";
import type { RawgGame } from "../../api/games";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { GameCard } from "../../shared-components/GameCard";
import { BackToHome } from "../../shared-components/backToHome";
import { Gamepad2Icon } from "lucide-react";
import { SectionTitle } from "../Home/SectionTitle";

export function Genres() {
    const { genreId } = useParams();
    const [games, setGames] = useState<RawgGame[]>([]);
    const [genre, setGenre] = useState<RawgGenre>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();


    useEffect(() => {
        async function load() {
            try {
                if (!genreId) return;
                const [games, genres] = await Promise.all([fetchGamesByGenre(Number(genreId)), fetchGameGenres()]);
                setGames(games.results);
                const genreById = genres.results.find((genre) => genre.id === Number(genreId));
                if (genreById) setGenre(genreById);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [genreId]);

    if (isLoading) return <Loading />;

    if (error) return <Error />;


    return (
        <>
            <div className="flex flex-col gap-6 lg:gap-8">
                <BackToHome />
                <SectionTitle icon={<Gamepad2Icon className="w-10 h-10 text-purple-400 lg:w-16 lg:h-16" />} title={genre?.name ?? ""} addClass="text-3xl lg:text-5xl" />
                <p className="text-slate-400 text-lg font-medium"><span className="bg-gradient-to-t from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">{genre?.games_count ?? "—"}</span> Games Found</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} genre={genre?.name ?? ""} />
                    ))}
                </ul>
            </div>
        </>
    )
}