// import envConfig from "@/config";
import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "@/apiRequest/account";

export default async function MeProfile(){
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')

    const result = await accountApiRequest.me(sessionToken?.value ?? '')
    // fetch(
    //     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': `Bearer ${sessionToken?.value}`
    //       },
    //     }
    //   ).then(async (res) => {
    //     console.log(res);
    //     const payload = await res.json();
    //     const data = {
    //       status: res.status,
    //       payload
    //     };
    //     if (!res.ok) {
    //       throw data;
    //     }
    //     return data;
    //   })
      // console.log(result)

    return <div>
      xin chao {result.payload.data.name}
    
      <Profile/>
     </div>
    
}