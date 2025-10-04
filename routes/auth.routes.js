import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  // Handle login
    res.send({title:"User logged in" });
});

authRouter.post("/register", (req, res) => {
  // Handle registration
  res.send({title:"User registered" });
});

authRouter.post("/logout", (req, res) => {
  // Handle logout
  res.send({title: "User logged out"} );
});



export default authRouter;
