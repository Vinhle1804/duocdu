// "use client"; // Bắt buộc vì Next.js chạy Server Component mặc địn

// import { createContext, useContext, useState } from "react";

// // 1. Tạo context
// const AuthContext = createContext();

// // 2. Tạo provider để bọc toàn bộ ứng dụng
// export const AuthProvider = ({ children }) => {
//   const [sessionToken, setSessionToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{ sessionToken, setSessionToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 3. Hook để sử dụng AuthContext
// export const useAuth = () => {
    
//   return useContext(AuthContext);
// };
