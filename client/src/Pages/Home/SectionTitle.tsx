type SectionTitleProps = {
    icon: React.ReactNode;
    title: string;
    addClass?: string;
    gamesCount: number;
}

export function SectionTitle({ icon, title, addClass, gamesCount }: SectionTitleProps) {
    return (
        <section className="flex flex-col">
            <h2 className={`flex flex-wrap items-center gap-3 text-2xl lg:text-3xl font-bold leading-normal lg:leading-[1.2] ${addClass ?? ""}`}>
                {icon}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pb-1">
                    {title}
                </span>
            </h2>
            {gamesCount ? (
                <p className="text-slate-400 text-lg font-medium">
                    <span className="bg-gradient-to-t from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
                        {gamesCount || "—"}
                    </span>{" "}
                    Games Found
                </p>
            ) : null}
        </section>
    );
}