export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-6">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-violet-600/10 rounded-full"></div>
        <div className="absolute w-20 h-20 border-4 border-violet-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>   
      </div>
      
      <div className="text-center">
        <p className="text-zinc-400 font-medium tracking-[0.2em] uppercase text-xs animate-pulse">
          Carregando
        </p>
        <div className="flex gap-1 justify-center mt-2">
           <span className="w-1 h-1 bg-violet-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           <span className="w-1 h-1 bg-violet-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
           <span className="w-1 h-1 bg-violet-600 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}