import { SparklesIcon } from 'lucide-react';

export function Hero() {
    return (
        
        <div className="w-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 p-4 rounded-3xl overflow-hidden relative flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-16 gap-3">
            <h1 className="leading-[1.4] lg:leading-[1.4] text-4xl font-bold text-white flex items-center gap-2"><SparklesIcon className="w-8 h-8 text-purple-400" aria-hidden="true" focusable="false" /><span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-4xl lg:text-6xl pb-1 lg:pb-3">Discover Amazing Games</span></h1>
            <p className="text-slate-300 text-lg lg:text-xl max-w-2xl">Explore thousands of games across all platforms and genres. Find your next favorite game today.</p>
            <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODgiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAgMTZjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMzJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]">
                
            </div>
        </div>
        
    )
}