import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { password } = req.body;
    console.log("Expected password (from env):", ADMIN_PASSWORD);
  console.log("Received password (from request):", password);

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // issue a JWT valid for 6h
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "6h" });

  return res.json({ token });
});

// Middleware for protecting admin routes
export function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== "admin") throw new Error("Not admin");
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export default router;
