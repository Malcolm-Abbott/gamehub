import { SparklesIcon } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

export function FeaturedHome() {
    return (
        <section className="flex flex-col gap-4 lg:gap-6">
            <SectionTitle icon={<SparklesIcon className="w-7 h-7 text-purple-400" aria-hidden="true" focusable="false" />} title="Featured Games" />
        </section>
    )
}