import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// fake DB
let applications: any[] = [];

app.get("/api/stats", (_, res) => {
  res.json({
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    denied: applications.filter(a => a.status === "denied").length
  });
});

app.post("/api/apply", (req, res) => {
  const appData = {
    id: Date.now(),
    status: "pending",
    ...req.body
  };

  applications.push(appData);
  res.json(appData);
});

app.get("/api/applications", (_, res) => {
  res.json(applications);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});