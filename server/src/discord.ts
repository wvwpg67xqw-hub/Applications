export const DISCORD = {
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  redirectUri: "http://localhost:3000/api/auth/callback"
};

export function getDiscordAuthURL() {
  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD.clientId}&redirect_uri=${encodeURIComponent(
    DISCORD.redirectUri
  )}&response_type=code&scope=identify`;
}