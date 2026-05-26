import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.session.user || req.session.user.role === "user") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

router.use(requireAdmin);

// applications
router.get("/applications", async (_, res) => {
  res.json(await prisma.application.findMany());
});

router.post("/applications/:id/accept", async (req, res) => {
  const app = await prisma.application.update({
    where: { id: Number(req.params.id) },
    data: { status: "accepted" }
  });
  res.json(app);
});

router.post("/applications/:id/deny", async (req, res) => {
  const app = await prisma.application.update({
    where: { id: Number(req.params.id) },
    data: { status: "denied" }
  });
  res.json(app);
});

export default router;