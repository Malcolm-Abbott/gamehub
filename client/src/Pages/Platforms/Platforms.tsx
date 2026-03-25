import { useParams } from "react-router-dom";

export function Platforms() {
    const { platformId } = useParams();
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-white">{platformId}</h1>
        </div>
    )
}