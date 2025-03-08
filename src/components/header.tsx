"use client";
import { ModeToggle } from "./toggle-theme";
import ButtonLogout from "./buttonLogout";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppProvider";
import { isObjectEmpty } from "@/utils/isObjectEmpty";

export default function Header() {
  const { user } = useAppContext();
  console.log(user);

  return (
    <div>
      <ModeToggle />

      <ul>
        <li>
          <Link href={"/product"}>Product</Link> <br />
        </li>
        {!isObjectEmpty(user) ? (
          <>
            <li>
              <span>
                xin chao <strong>{user.name}</strong>
              </span>
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
