import { PrismaClient } from "@prisma/client";
import { sendEmailToken } from "../services/emailService";
const jwt = require("jsonwebtoken");
const { Router } = require("express");

const router = Router();
const prisma = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTH_TOKEN_EXPIRATION_HOURS = 24;
const JWT_SECRET = process.env.JWT_SECRET;

//Generate a random 8 digit number as the email token
function generateEmailToken() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number) {
  const jwtPayload = { tokenId };

  return jwt
    .sign(jwtPayload, JWT_SECRET, {
      algorithm: "HS256",
    })
    .toString();
}

//Create a user, if it doesn't exist,
//Generate the emailToken and send it to the user's email
router.post("/login", async (req: any, res: any) => {
  const { email } = req.body;

  //Generate a token
  const emailToken = generateEmailToken().toString();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });

    sendEmailToken(email, emailToken);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: "Authentication failed!!!" });
  }
});

//Validate the emailToken
//Generate a long-lived JWT token
router.post("/authenticate", async (req: any, res: any) => {
  const { email, emailToken } = req.body;
  const dbEmailToken = await prisma.token.findUnique({
    where: { emailToken },
    include: { user: true },
  });
  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ error: "Token expired" });
  }
  if (dbEmailToken?.user?.email !== email) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  //Here we validate that the user is the owner of the email

  //Generate an API token

  const expiration = new Date(
    new Date().getTime() + AUTH_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  //Invalidate the email
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });

  //Generate the JWT token
  const authToken = generateAuthToken(apiToken.id);

  res.status(200).json({ authToken });
});

export default router;
