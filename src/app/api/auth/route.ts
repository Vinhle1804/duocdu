export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.sessionToken as string
  console.log("Dữ liệu request:", res);
  if (!sessionToken) {
    return Response.json(
      { message: "kh nhận đc token" },
      {
        status: 400,
      }
    );
  }

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken} ; Path=/; HttpOnly `,
    },
  });
}

