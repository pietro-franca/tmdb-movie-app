import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/");
    } catch {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
        
        <h1 className="text-3xl font-black text-center mb-2">Criar conta</h1>
        <p className="text-zinc-400 text-center mb-8">
          Cadastre-se para começar a avaliar filmes
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition py-3 rounded-lg font-bold disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-8">
          Já possui cadastro?{" "}
          <Link to="/login" className="text-violet-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
