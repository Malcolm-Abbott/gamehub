import { useParams } from "react-router-dom";
import { fetchGamesByGenre, RawgGenre, fetchGameGenres } from "../../api/genres";
import { useState, useEffect } from "react";
import type { RawgGame } from "../../api/games";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { GameCard } from "../../shared-components/GameCard";

export function Genres() {
    const { genreId } = useParams();
    const [games, setGames] = useState<RawgGame[]>([]);
    const [genre, setGenre] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();


    useEffect(() => {
        async function load() {
            try {
                if (!genreId) return;
                const [games, genres] = await Promise.all([fetchGamesByGenre(Number(genreId)), fetchGameGenres()]);
                setGames(games.results);
                const genreById = genres.results.find((genre) => genre.id === Number(genreId));
                if (genreById) setGenre(genreById.name);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [genreId]);

    {isLoading && <Loading />}

    {error && <Error />}

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} genre={genre ?? ""} />
            ))}
        </ul>
    )
}