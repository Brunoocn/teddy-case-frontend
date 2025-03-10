import { cookies } from "next/headers";

export async function getUserId() {
  const nextCookies = await cookies();
  const userInfos = JSON.parse(nextCookies.get("TEDDY::USER")?.value || "{}");
  return userInfos.id;
}