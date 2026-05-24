import express from "express";
import session from "express-session";
import cors from "cors";

import authRoutes from "./routes/auth";
import appRoutes from "./routes/applications";
import adminRoutes from "./routes/admin";
import statsRoutes from "./routes/stats";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false
}));

app.use((req: any, _, next) => {
  req.user = req.session.user;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", appRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});