import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/games";
import { fetchGameTrailers } from "../../api/trailers";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import type { RawgGameDetail } from "../../api/games";
import type { RawgGameMovie } from "../../api/trailers";
import { BackToHome } from "../../shared-components/BackToHome";
import { LeftHalf } from "./LeftHalf";
import { RightHalf } from "./RightHalf";

export function Game() {
    const { gameId } = useParams();
    const [game, setGame] = useState<RawgGameDetail>();
    const [trailer, setTrailer] = useState<RawgGameMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        async function load() {
            try {
                if (!gameId) return;
                const [game, trailer] = await Promise.all([fetchGameById(Number(gameId)), fetchGameTrailers(Number(gameId))]);
                setGame(game);
                setTrailer(trailer);
                console.log('game:', game);
                console.log('trailer:', trailer);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [gameId]);

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    if (!game) return <Error />;

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <BackToHome />
            <div className="grid grid-cols-2">
                <LeftHalf game={game} trailers={trailer} />
                <RightHalf />
            </div>
        </div>
    )
}