import { getApiKey } from "./apiKey";
import { GamesListResponse } from "./games";

export interface RawgPlatform {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    image: string | null;
    year_start: number | null;
    year_end: number | null;
    /** Present on platform detail responses and static fixtures */
    description?: string;
}

export interface PlatformsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawgPlatform[];
}

export async function fetchPlatforms(): Promise<PlatformsListResponse> {
    const url = new URL(`https://api.rawg.io/api/platforms`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as PlatformsListResponse;
}

export async function fetchPlatformById(id: number): Promise<RawgPlatform> {
    const url = new URL(`https://api.rawg.io/api/platforms/${id}`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as RawgPlatform;
}

export async function fetchGamesByPlatform(platformId: number): Promise<GamesListResponse> {
    const url = new URL(`https://api.rawg.io/api/games`);
    url.searchParams.set('key', getApiKey());
    url.searchParams.set('platforms', platformId.toString());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as GamesListResponse;
}

export const pc: RawgPlatform = {
    id: 4,
    name: "PC",
    slug: "pc",
    games_count: 560_545,
    image_background:
        "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
    image: null,
    year_start: null,
    year_end: null,
    description:
        "<p>PC games, or personal computer games, started with the video game crash of 1983. PC games became popular after the development of the microprocessor and microcomputer. Some of the first PC games were Bertie the Brain, OXO and Spacewar!<br />\nAs the 3D graphics accelerators became faster and CPU power improved, PC games became more realistic and more accessible to produce. The PC market sales rocketed in the 80s when IBM computers and sound cards were generated. The platform involves different peripherals, gaming hardware, and software. These are mouse and keyboard; gamepads and motion controllers aren&#39;t obligatory, but still popularly accepted. Better hardware improves the game&#39;s accuracy; it usually lets the players use more NPCs than equivalents on other platforms. With the platform, the players can perform every sort of game. For example, shooters are easy to play due to the mouse controllers. However, the main reason for the PC games popularity is their lower prices and the backward compatibility with older titles, which leaves much to be desired on cosoles.</p>",
};

export const xboxSeriesX: RawgPlatform = {
    id: 186,
    name: "Xbox Series S/X",
    slug: "xbox-series-x",
    games_count: 1240,
    image_background:
        "https://media.rawg.io/media/games/6cc/6cc23249972a427f697a3d10eb57a820.jpg",
    image: null,
    year_start: 2020,
    year_end: null,
    description: "",
};

export const playstation5: RawgPlatform = {
    id: 187,
    name: "PlayStation 5",
    slug: "playstation5",
    games_count: 1457,
    image_background:
        "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
    image: null,
    year_start: 2020,
    year_end: null,
    description: "",
};

