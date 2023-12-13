import { createContext, useContext, useState } from 'react';
import type {ReactNode} from 'react';
import { checkAuth } from "@/utils/client";
import type { checkAuthPayload } from "@lib/shared_types";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<string | null>(() => {
    // 從 sessionStorage 中讀取使用者資訊
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const payload: checkAuthPayload = {
        username: username,
        password: password,
      };
    // Perform authentication logic, set user if successful
    // Example: const authenticatedUser = await authenticate(username, password);
    const check = await checkAuth(payload);
    if (check.data.success === true) {
        const authenticatedUser = username; 
        setUser(authenticatedUser);
        sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
    }
  };

  const logout = async () => {
    navigate("/");
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
