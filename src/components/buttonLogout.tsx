'use client'
import authApiRequest from "@/apiRequest/auth";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";


export default function ButtonLogout() {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = async () =>{
        try {
            await authApiRequest.logoutFromNextClientToNextServer()
            router.push('/login')
        } catch (error) {
            handleErrorApi({
                error
           
            });
        } authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
            router.push(`/login?redirectFrom=${pathname}`);
          });
    }
  return (
    <div>
     <Button onClick={() => handleLogout()}/> 
     <h1>đăng xuất</h1>
    </div>
  )
}
