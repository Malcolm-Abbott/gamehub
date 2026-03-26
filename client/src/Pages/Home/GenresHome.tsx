import { Gamepad2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RawgGenre } from '../../api/genres';
import { genreCards } from '../../data/staticCards';
import { SectionTitle } from './SectionTitle';

export function GenresHome() {
    return (
        <section className="flex flex-col gap-4 lg:gap-6">
            <SectionTitle icon={<Gamepad2Icon className="w-7 h-7 text-purple-400" aria-hidden="true" focusable="false" />} title="Browse by Genre" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {genreCards.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
        </section>
    )
}


type GenreCardProps = {
    genre: RawgGenre;
}

function GenreCard({ genre }: GenreCardProps) {
    return (
        <Link
            to={`/genres/${genre.id}`}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
        >
            <img src={genre.image_background} alt={genre.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center p-4"><span className="text-white font-bold lg:text-lg group-hover:text-purple-400 transition-colors duration-200">{genre.name}</span></div>
        </Link>
    )
}
