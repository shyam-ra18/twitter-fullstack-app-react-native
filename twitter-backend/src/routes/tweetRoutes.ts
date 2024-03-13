import { PrismaClient } from "@prisma/client";

const { Router } = require("express");

const router = Router();
const prisma = new PrismaClient();

//Create Tweet
router.post("/", async (req: any, res: any) => {
  const { content, image } = req.body;
  const userId = req.user.id;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId,
      },
      include: {
        user: true,
      },
    });
    res.status(201).json({ message: "Tweet created successfully", result });
  } catch (error) {
    res.status(400).json({ error: "Failed to create a tweet" });
  }
});

//List Tweet
router.get("/", async (req: any, res: any) => {
  const allTweet = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          // email: true,
          image: true,
          bio: true,
        },
      },
    },
  });
  res.status(200).json(allTweet);
});

//Get one Tweet
router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
    },
  });
  if (!tweet) {
    res.status(501).json({ error: `No tweet found : ${id}` });
  }
  res.status(200).json(tweet);
});

//Update Tweet
router.put("/:id", (req: any, res: any) => {
  const { id } = req.params;
  res.status(501).json({ error: `No userfoung : ${id}` });
});

//Delete Tweet
router.delete("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
