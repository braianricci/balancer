const express = require("express");
const cors = require("cors");

const app = express();

// CORS – allow your browser client to call the server
app.use(cors({ origin: "*" }));

// JSON parser
app.use(express.json());

// Avoid browser caching (prevents 304 Not Modified)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// FAKE MODULE LIST (later replace with real DB/file)
const modules = [
  { id: "erp", version: "1.0" },
  { id: "crm", version: "2.0" }
];

// GET /updates → client asks what modules exist and versions
app.get("/updates", (req, res) => {
  res.json({ modules });
});

// POST /assign → server decides which connection-server to use
app.post("/assign", (req, res) => {
  const moduleId = req.body.module;

  // FAKE load balancer: pick one at random
  const servers = [
    { host: "192.168.1.10", port: 3389 },
    { host: "192.168.1.11", port: 3389 }
  ];
  const selected = servers[Math.floor(Math.random() * servers.length)];

  res.json({
    host: selected.host,
    port: selected.port,
    username: "demo",
    password: "demo123"
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
