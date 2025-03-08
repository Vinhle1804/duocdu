"use client";
import { ModeToggle } from "./toggle-theme";
import ButtonLogout from "./buttonLogout";
import Link from "next/link";



export default function Header() {

  return (
    <div>
      <ModeToggle />

      <ul>
        <li>
          <Link href={"/product"}>Product</Link> <br />
        </li>
         
          <>
            <li>
              <span>
                xin chao <strong>huhu</strong>
              </span>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        
          <>
            <li>
              <Link href={"/login"}> Đăng nhập </Link> <br />
            </li>
            <li>
              <Link href={"/register"}>Đăng ký</Link> <br />
            </li>
          </>
        
      </ul>
    </div>
  );
}
