import { getAuth } from "@clerk/express";

// Middleware ตรวจสอบ login
export const requireLogin = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Middleware ตรวจสอบ role
export const requireRole = (role) => {
  return (req, res, next) => {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userRole = auth.sessionClaims?.role;
    if (userRole !== role) {
      return res.status(403).json({ error: `Require role: ${role}` });
    }
    next();
  };
};

// หรือ middleware ตรวจหลาย role
export const requireRoles = (roles) => {
  return (req, res, next) => {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userRole = auth.sessionClaims?.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: `Require role: ${roles.join(", ")}` });
    }
    next();
  };
};