import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RoleEnum } from '@/enums/role.enum';

type AuthContextType = {
  user: { role: RoleEnum | null } | null;
  login: (role: RoleEnum) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ role: RoleEnum | null } | null>(null);

  const login = (role: RoleEnum) => setUser({ role });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
