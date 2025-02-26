import { decodeJWT } from "@/lib/utils"

type PayloadJWT = {
  iat: number
  exp: number
  tokenType: string
  userID: number
}

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.sessionToken as string;

  if (!sessionToken) {
    return Response.json(
      { message: "kh nhận đc token" },
      {
        status: 400,
      }
    );
  }
  //lấy payload của sessionToken
const payload = decodeJWT<PayloadJWT>(sessionToken)
const expiresDate = new Date(payload.exp  *1000).toUTCString()


  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken} ; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure  `,
    },
  });
}
