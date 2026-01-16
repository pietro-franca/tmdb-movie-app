import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as loginService, register as registerService, logout as logoutService } from "./authService";

type User = {
  id: number;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// centraliza as operações de login, cadastro e logout
// garante que os demais componentes saibam se um usuário foi autenticado

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ao carregar, tenta buscar os dados do usuário atual
  // permite que um usuário permaneça logado depois de um F5
  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function register(username: string, email: string, password: string) {
    await registerService(username, email, password);
    
    await loginService(email, password);

    const me = await getMe();
    setUser(me);
  }

  async function login(username: string, password: string) {
    await loginService(username, password);
    const me = await getMe();
    setUser(me);
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
