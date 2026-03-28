import { ExternalLinkIcon } from "lucide-react"

type VisitOfficialProps = {
    website: string;
    name: string;
}

export function VisitOfficial({ website, name }: VisitOfficialProps) {
    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Visit Official Website</h2>
                <a href={website ?? "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit ${name ?? "Game Name Not Found"} official website`}
                className="group flex items-center self-start gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-slate-800 rounded-xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 transition-all duration-200 hover:shadow-md hover:shadow-slate-400/15 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-900/90 hover:to-purple-900/90">
                    <span className="line-clamp-1 text-sm sm:text-base bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold tracking-wide group-hover:text-blue-600/80 group-hover:from-blue-400/80 group-hover:to-purple-400/80 transition-colors duration-200">
                        {website || "Website Not Found"}
                    </span>
                <ExternalLinkIcon className="w-6 h-6 text-blue-400 my-auto group-hover:text-blue-600 transition-colors duration-200" aria-hidden="true" focusable="false" />
            </a>
        </>
    );
}