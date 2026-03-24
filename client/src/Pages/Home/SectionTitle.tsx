type SectionTitleProps = {
    icon: React.ReactNode;
    title: string;
}

export function SectionTitle({ icon, title }: SectionTitleProps) {
    return (
            <h2 className="flex gap-3 items-center text-2xl lg:text-3xl font-bold">{icon} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{title}</span></h2>
    )
}