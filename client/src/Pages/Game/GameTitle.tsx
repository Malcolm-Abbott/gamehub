import { HeartIcon } from "lucide-react";

type GameTitleProps = {
    name: string;
}

export function GameTitle({ name }: GameTitleProps) {
    return (
        <div className="flex justify-between">
            <h1 className="text-4xl sm:text-5xl font-bold text-white/90">{name || "Game Name Not Found"}</h1>
            <button className="group p-3 md:p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl hover:shadow-sm hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
                type="button"
                aria-label={`Add ${name} to favorites`}>
                <HeartIcon className="w-6 h-6 text-purple-400 my-auto group-hover:text-purple-600/ transition-colors duration-200" aria-hidden="true" focusable="false" />
            </button>
        </div>
    )
}