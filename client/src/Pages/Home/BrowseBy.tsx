import { FeaturedHome } from './FeaturedHome';
import { GenresHome } from './GenresHome';
import { PlatformsHome } from './PlatformsHome';

type BrowseByProps = {
    category: string;
}

export function BrowseBy({ category }: BrowseByProps) {
    switch (category) {
        case 'genre':
            return (
                <GenresHome />
            )
        case 'platform':
            return (
                <PlatformsHome />
            )
        case 'featured':
            return (
                <FeaturedHome />
            )
        default:
            return null;
    }
}
