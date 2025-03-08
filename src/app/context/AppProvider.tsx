"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useState } from "react";
export type User = AccountResType["data"];

const currentUser = JSON.parse(localStorage.getItem("__user") ?? "{}");

const AppContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: currentUser,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user: User | null;
}) {
  const [user, _setUser] = useState<User>(currentUser);
  useState(() => {
    clientSessionToken.value = initialSessionToken;
  });
  const setUser = (updateUser: User) => {
    localStorage.setItem("__user", JSON.stringify(updateUser));
    _setUser(user);
  };
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
