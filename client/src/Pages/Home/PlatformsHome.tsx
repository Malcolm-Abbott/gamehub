import { TrophyIcon } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

export function PlatformsHome() {
    return (
        <>
            <SectionTitle icon={<TrophyIcon className="w-7 h-7 text-purple-400" />} title="Browse by Platform" />
        </>
    )
}