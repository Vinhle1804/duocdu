"use client";
import { clientSessionToken } from "@/lib/http";
import { createContext,useState} from "react";

// const AppContext = createContext({
//   sessionToken: "",
// });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppContext = createContext({
  // sessionToken: string;
  // setSessionToken: (token: string) => void;
})

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an APpProvider");
//   }
//   return context;
// };

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
useState(()=>{
  clientSessionToken.value = initialSessionToken
})
  return (
 
    <>{children}</>  
  
  );
}
