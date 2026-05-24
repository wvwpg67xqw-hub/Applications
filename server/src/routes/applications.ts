import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req: any, res) => {
  const user = req.session.user;

  if (!user) return res.status(401).json({ error: "Not logged in" });

  const app = await prisma.application.create({
    data: {
      discordId: user.id,
      username: user.username,
      ...req.body
    }
  });

  res.json(app);
});

router.get("/stats", async (_, res) => {
  const [total, pending, accepted, denied] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "pending" } }),
    prisma.application.count({ where: { status: "accepted" } }),
    prisma.application.count({ where: { status: "denied" } })
  ]);

  res.json({ total, pending, accepted, denied });
});

export default router;