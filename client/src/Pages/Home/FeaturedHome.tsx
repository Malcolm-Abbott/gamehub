import { SparklesIcon } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

export function FeaturedHome() {
    return (
        <>
            <SectionTitle icon={<SparklesIcon className="w-7 h-7 text-purple-400" />} title="Featured Games" />
        </>
    )
}