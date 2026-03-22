
import { useEffect, useState } from "react";
// import { RawgGame } from "../../api/games";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { Hero } from "./Hero";

export function Home() {
    // const [featuredGames, setFeaturedGames] = useState<RawgGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>();
    
    useEffect(() => {
        async function load() {
            try {
                console.log('home');
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
        
  }, []);

  {isLoading && <Loading />}

  {error && <Error />}

  return (
    <div>
        <Hero />
    </div>
  )
}