import { Gamepad2Icon } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export function GenresHome() {
    return (
        <>
            <SectionTitle icon={<Gamepad2Icon className="w-7 h-7 text-purple-400" />} title="Browse by Genre" />
        </>
    )
}
