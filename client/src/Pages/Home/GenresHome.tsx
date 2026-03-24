import { Gamepad2Icon } from 'lucide-react';

export function GenresHome() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h1 className="flex gap-3 items-center text-2xl lg:text-3xl font-bold text-white"><Gamepad2Icon className="w-7 h-7 text-purple-400" /><span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Browse by Genre</span></h1>
        </div>
    )
}
