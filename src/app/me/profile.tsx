"use client";
// import envConfig from "@/config";
import { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import { useAppContext } from "../context/AppProvider";

export default function Profile() {
  const { user,setUser } = useAppContext();

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
      // fetch(
      //   `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       'Authorization': `Bearer ${sessionToken}}`
      //     },
      //   }
      // ).then(async (res) => {
      //   console.log(res);
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload
      //   };
      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // })

      const user = result.payload.data;
      setUser(user);
    };
    fetchRequest();
  }, []);

  return (
    <div>
      Profile <br />
      file này là client
    </div>
  );
}
