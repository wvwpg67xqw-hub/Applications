import { Router } from "express";
import { exchangeCode } from "../auth";

const router = Router();

router.get("/login", (req, res) => {
  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/api/auth/callback"
    )}&response_type=code&scope=identify`
  );
});

router.get("/callback", async (req: any, res) => {
  const code = req.query.code as string;

  const user = await exchangeCode(code);

  req.session.user = {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    role: "user"
  };

  res.redirect("http://localhost:5173/");
});

router.get("/me", (req: any, res) => {
  res.json(req.session.user || null);
});

router.post("/logout", (req: any, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

export default router;