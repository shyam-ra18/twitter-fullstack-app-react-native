const express = require("express");
const cors = require("cors");
import userRoute from "./routes/userRoutes";
import tweetRoute from "./routes/tweetRoutes";
import authRoute from "./routes/authRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", authenticateToken, userRoute);
app.use("/tweet", authenticateToken, tweetRoute);
app.use("/auth", authRoute);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
