import fetch from "node-fetch";
import { DISCORD } from "./discord";

export async function exchangeCode(code: string) {
  const data = new URLSearchParams({
    client_id: DISCORD.clientId,
    client_secret: DISCORD.clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD.redirectUri
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  });

  return await userRes.json();
}