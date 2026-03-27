type GameImageProps = {
    src: string;
    alt: string;
}

export function GameImage({ src, alt }: GameImageProps) {
    return (
        <div className="aspect-rectangle overflow-hidden rounded-2xl border border-slate-700/50">
            <img src={src || ""} alt={alt || ""} className="w-full h-full object-cover" />
        </div>
    )
}