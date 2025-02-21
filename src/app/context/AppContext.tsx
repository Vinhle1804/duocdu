"use client";
import { createContext, useContext, useState } from "react";

// const AppContext = createContext({
//   sessionToken: "",
// });
const AppContext = createContext<{
  sessionToken: string;
  setSessionToken: (token: string) => void;
} | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an APpProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
