'use client'
// import envConfig from "@/config";
import { useEffect } from "react"
import { useAppContext } from "../context/AppContext";
import accountApiRequest from "@/apiRequest/account";


export default function Profile() {
  const {sessionToken} = useAppContext()  
  useEffect(()=>{
  const fetchRequest = async () => {
    const result = await accountApiRequest.me(sessionToken)
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
    console.log(result) 
  }
fetchRequest()

},[sessionToken])

  return (
    <div>
      Profile  <br/>
      file này là client nên phải dùng useContext, server thì khoải
    </div>
  )
}
