import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LogOut } from "lucide-react";
import logo from "../../public/pixel-breeders-logo.bmp"

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md px-8 py-5 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-3 text-violet-500 sm:text-3xl text-xl font-extrabold tracking-tighter"><img className="h-[40px] rounded-lg" src={logo} alt="logo" /> SEARCH</Link>

        <ul className="flex gap-6 text-md font-medium text-zinc-400 items-center">
          <li><Link to="/" className="hover:text-white transition">Início</Link></li>
          <li><Link to="/rated" className="hover:text-white transition -center">Filmes Avaliados</Link></li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
          <span className="text-md text-white">{user?.username}</span>
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.username}&background=random`} 
            alt="Avatar" 
            className="w-9 h-9 rounded-full border border-violet-500 border-2"
          />
        </div>
        <button aria-label="Logout Button" onClick={() => { logout(); navigate("/login"); }} className="text-zinc-400 hover:text-violet-500 transition cursor-pointer">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}