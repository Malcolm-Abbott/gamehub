import { MonitorIcon } from "lucide-react"

type GamePlatformsProps = {
    platforms: { platform: { id: number; name: string; slug: string } }[];
}

export function GamePlatforms({ platforms }: GamePlatformsProps) {
    return (
        <div className="flex gap-2">
                <MonitorIcon className="w-8 h-8 text-blue-300/80 my-auto" aria-hidden="true" focusable="false" />
                <ul className="flex flex-wrap flex-1 gap-2 cursor-default">
                    {platforms?.filter((platform) => (platform.platform.name === "PC") || (platform.platform.name === "PlayStation 5") || (platform.platform.name === "Xbox Series S/X")).map((platform) => (
                        <li key={platform?.platform?.id} className="sm:text-lg font-medium bg-blue-600/10 border border-blue-600/50 rounded-md px-3 py-1">
                            <span className="bg-gradient-to-br to-purple-700/80 from-blue-600/80 bg-clip-text text-transparent font-bold">
                                {platform.platform.name === "PlayStation 5" ? "PS5" : platform.platform.name === "Xbox Series S/X" ? "XBOX" : platform.platform.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
    )
}