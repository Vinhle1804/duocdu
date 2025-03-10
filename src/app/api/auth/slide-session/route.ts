import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
    const cookieStore = cookies()
    const sessionToken = (await cookieStore).get('sessionToken')
    console.log("Session Token:", sessionToken); 

  
    if (!sessionToken) {
      return Response.json(
        { message: "kh nhận đc token ở file slide-session" },
        {
          status: 401,
        }
      );
    }
  try {
    const res = await authApiRequest.slideSessionFromNextServerToServer(sessionToken.value)
    const newExpiresDate = new Date(res.payload.data.expiresAt).toUTCString()
    return Response.json(res.payload, {
        status: 200,
        headers: {
          "Set-Cookie":`sessionToken=${sessionToken.value} ; Path=/; HttpOnly; Expires=${newExpiresDate}; SameSite=Lax; Secure  `,
        },
      });
  } catch (error) {
    if (error instanceof HttpError) {
          return Response.json(error.payload, {
            status: error.status,
          });
        } else {
          return Response.json(
            {
              message: "looix ko xac dinh",
            },
            {
              status: 500,
            }
          );
        }
  }
 

  
  
   
  }
  