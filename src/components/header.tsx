"use client";
import { ModeToggle } from "./toggle-theme";
import ButtonLogout from "./buttonLogout";
import Link from "next/link";
import { AccountResType } from "@/schemaValidations/account.schema";




export default function Header({user}:{
  user: AccountResType['data'] | null
}) {
    
  return (
    <div>
      <ModeToggle />
      <ul>
        <li>
          <Link href={"/product"}>Product</Link> <br />
        </li>
        {user ? (
          <>
            <li>
              <Link href={'/me'}>
              
                xin chao <strong>{user.name}</strong>
              </Link>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}> Đăng nhập </Link> <br />
            </li>
            <li>
              <Link href={"/register"}>Đăng ký</Link> <br />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
