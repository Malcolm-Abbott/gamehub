import { useParams } from "react-router-dom";

export function Genres() {
    const { genreId } = useParams();
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-white">{genreId}</h1>
        </div>
    )
}