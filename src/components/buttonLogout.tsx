"use client";
import authApiRequest from "@/apiRequest/auth";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useAppContext } from "@/app/context/AppProvider";

export default function ButtonLogout() {
  const { user } = useAppContext();
  console.log(user);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      localStorage.removeItem("__user");
      router.push(`/login?redirectFrom=${pathname}`);
    } catch (error) {
      handleErrorApi(error);
    }
  };
  return (
    <div>
      <Button onClick={() => handleLogout()}>Đăng xuất </Button>
    </div>
  );
}
