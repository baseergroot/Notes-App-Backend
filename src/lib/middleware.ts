import getUser from "./getUser.js"
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET!
export default async function middleware(req: any, res: any, next: any) {

  if (!jwtSecret) {
    console.log("JWT_SECRET is not defined")
    res.json({
      success: false,
      error: "JWT_SECRET is not defined"
    })
  }
  const user = await getUser(req, jwtSecret)
  if (user) {
    console.log("user is logged in")
    req.user = user
    next()
  }
  else {
    console.log("user is not logged in")
    res.json({
      success: false,
      error: "You are not logged in"
    })
  }
  
}