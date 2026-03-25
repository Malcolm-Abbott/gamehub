import { useParams } from "react-router-dom";
import { fetchGamesByGenre } from "../../api/genres";
import { useState, useEffect } from "react";
import type { RawgGame } from "../../api/games";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";

export function Genres() {
    const { genreId } = useParams();
    const [games, setGames] = useState<RawgGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        async function load() {
            try {
                if (!genreId) return;
                const games = await fetchGamesByGenre(Number(genreId));
                setGames(games.results);
                console.log(games);
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
        <ul>
            {games.map((game) => (
                <li key={game.id}>
                    <h2>{game.name}</h2>
                </li>
            ))}
        </ul>
    )
}