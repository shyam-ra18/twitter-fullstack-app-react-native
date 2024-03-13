import { PrismaClient } from "@prisma/client";

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];
  if (!jwtToken) {
    return res.sendStatus(401);
  }

  //Decode JWT token
  try {
    const payload = await jwt.verify(jwtToken, JWT_SECRET);
    const dbToken = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: { user: true },
    });
    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      return res.status(401).jason({ error: "Token expired" });
    }

    req.user = dbToken.user;
  } catch (error) {
    return res.sendStatus(401);
  }
  next();
}
