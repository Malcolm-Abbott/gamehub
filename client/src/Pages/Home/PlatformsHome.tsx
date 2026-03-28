import { TrophyIcon } from "lucide-react"
import { SectionTitle } from "./SectionTitle"
import { RawgPlatform } from "../../api/platform";
import { pc, ps5, xboxSeriesXs } from "../../api/platform";
import { Link } from "react-router-dom";

export function PlatformsHome() {
    return (
        <section className="flex flex-col gap-4 lg:gap-6">
            <SectionTitle icon={<TrophyIcon className="w-7 h-7 text-purple-400" aria-hidden="true" focusable="false" />} title="Browse by Platform" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PlatformCard platform={pc} />
                <PlatformCard platform={ps5} />
                <PlatformCard platform={xboxSeriesXs} />
            </div>
        </section>
    )
}

type PlatformCardProps = {
    platform: RawgPlatform;
}

function PlatformCard({ platform }: PlatformCardProps) {
    return (
        <Link to={`/platforms/${platform.id}`} className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 px-8 py-6 flex justify-center items-center">
            <div>
                <h3 className="text-white text-xl lg:text-2xl font-bold group-hover:text-purple-400 transition-colors duration-200 text-center mb-2">{platform.name}</h3>
                <p className="text-slate-400 text-sm lg:text-base font-semibold text-center">
                    <span className="group-hover:bg-gradient-to-t from-purple-400 to-blue-400 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold group-hover:tracking-wide transition-all duration-200">{platform.games_count}</span>{' '} 
                    games available
                </p>
            </div>
        </Link>
    )
}