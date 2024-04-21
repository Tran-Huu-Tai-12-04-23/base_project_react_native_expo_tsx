import React, { createContext, useContext, useState, FC } from 'react';

interface UserData {
   user: any;
}

interface AuthContextValue {
   user: UserData | null;
   login: (userData: UserData) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};

interface PropsType {
   children: React.ReactNode;
}
export const AuthProvider = ({ children }: PropsType) => {
   const [user, setUser] = useState<UserData | null>(null);

   const login = (userData: UserData) => {
      setUser(userData);
   };

   const logout = () => {
      setUser(null);
   };

   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
