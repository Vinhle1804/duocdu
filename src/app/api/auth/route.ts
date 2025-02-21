export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.payload?.data?.token;
  console.log("Dữ liệu request:", res);
  if (!sessionToken) {
    return Response.json(
      { mesage: "kh nhận đc token" },
      {
        status: 400,
      }
    );
  }

  return Response.json(res.payload, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken} ; Path=/; HttpOnly `,
    },
  });
}
