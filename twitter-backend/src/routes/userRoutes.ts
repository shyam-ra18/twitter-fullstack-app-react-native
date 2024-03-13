const { Router } = require("express");
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//Create user
router.post("/", async (req: any, res: any) => {
  const { email, name, username, bio, image } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio,
        image,
      },
    });
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    res.status(400).json({ error: "Create a unique user!!!" });
  }
});

//List users
router.get("/", async (req: any, res: any) => {
  const allUsers = await prisma.user.findMany({ include: { tweets: true } });
  res.status(200).json(allUsers);
});

//Get one users
router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { tweets: true },
  });
  if (!user) {
    res.status(501).json({ error: `No user found : ${id}` });
  }
  res.status(200).json(user);
});

//Update users
router.put("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;

  try {
    const updateduser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        image,
      },
    });
    res.status(200).json(updateduser);
  } catch (error) {}
  res.status(400).json({ error: "Failed to update the user" });
});

//Delete users
router.delete("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
