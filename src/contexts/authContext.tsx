import React, { createContext, useContext, useState } from "react";

interface ILoginData {
  accessToken: string;
  callmanagement: string;
  driverId: string;
  enumData: any;
  hotline: string;
  image: string;
  incident: string;
  permission: string[];
  phone: string;
  type: string;
  userId: string;
  driverName: string;
}
interface AuthContextValue {
  loginData: ILoginData | null;
  login: (data: ILoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface PropsType {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: PropsType) => {
  const [loginData, setLoginData] = useState<ILoginData | null>(null);

  const login = (data: ILoginData) => {
    setLoginData(data);
  };

  const logout = async () => {
    setLoginData(null);
    // await Helper.clearDataLogin();
  };

  return (
    <AuthContext.Provider value={{ loginData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
