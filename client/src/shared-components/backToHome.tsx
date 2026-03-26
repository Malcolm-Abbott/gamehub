import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

export function BackToHome() {
    return (
        <Link to="/" className="group flex items-center gap-2 font-medium text-slate-400 hover:text-white transition-colors duration-200">
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Home</span>
        </Link>
    )
}