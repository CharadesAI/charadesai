import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken as getStoredToken, setToken as storeToken, clearToken as clearStoredToken, setUser as storeUser, getUser as getStoredUser } from "@/lib/auth";
import { postJson } from "@/lib/api";

type User = {
  avatar?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
};

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getStoredToken();
    const u = getStoredUser();
    if (t) setToken(t);
    if (u) setUser(u);
    setLoading(false);
  }, []);

  const login = (t: string, u: User | null) => {
    setToken(t);
    setUser(u);
    storeToken(t);
    if (u) storeUser(u);
  };

  const logout = async () => {
    try {
      // call backend to logout (revokes token)
      await postJson("/auth/logout", {}, token || undefined);
    } catch (e) {
      // ignore errors during logout
      console.warn("Logout failed", e);
    }
    setToken(null);
    setUser(null);
    clearStoredToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
