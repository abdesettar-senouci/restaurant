import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  // Handle fetching all users
  res.send({ title: "fetch all users" });
});

userRouter.get("/:id", (req, res) => {
  // Handle fetching user by ID
  res.send({ title: "get user details"});
});

userRouter.post("/", (req, res) => {
  // Handle creating user profile
  res.send({ title: "create a new user" });
});

userRouter.put("/:id", (req, res) => {
  // Handle updating user profile
  res.send({ title: "update user details" });
});

userRouter.delete("/:id", (req, res) => {
  // Handle deleting user profile
  res.send({ title: "delete user" });
});

export default userRouter;
