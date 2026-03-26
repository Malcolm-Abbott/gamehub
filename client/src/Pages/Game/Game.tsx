import { useParams } from "react-router-dom";

export function Game() {
    const { gameId } = useParams();

    return (
        <div>
            <h1 className="text-2xl font-bold text-white">{gameId}</h1>
        </div>
    )
}