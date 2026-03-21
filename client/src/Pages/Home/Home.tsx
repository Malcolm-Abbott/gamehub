
import { useEffect, useState } from "react";
import { RawgGame } from "../../api/games";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";

export function Home() {
    const [featuredGames, setFeaturedGames] = useState<RawgGame[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();
    
    useEffect(() => {
        async function load() {
            
        }
    load();
  }, []);

//   if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div>
        <h1 className="text-2xl font-bold text-white">Home</h1>
    </div>
  )
}