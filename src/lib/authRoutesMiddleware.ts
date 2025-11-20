import getUser from "./getUser.ts";
import dotenv from 'dotenv';
dotenv.config();


const jwtSecret = process.env.JWT_SECRET!
export default async function AuthMiddleware(req: any, res: any, next: any) {
  if (!jwtSecret) {
    console.log("JWT_SECRET is not defined")
    res.json({
      success: false,
      error: "JWT_SECRET is not defined"
    })
  }

  const user = req.user

  if (user) {
    console.log("user is already logged in")
    res.json({
      success: false,
      error: "You are already logged in"
    })
  }
  next()
}