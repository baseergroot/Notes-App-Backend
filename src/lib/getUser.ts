import  jwt  from "jsonwebtoken"

interface GetUser {
  username: string,
  iat?: number,
  exp?: number
}
const getUser = async (req: any, jwtSecret: string): Promise<GetUser | null> => {
  try {
    const cookie = req.cookies.token
    const user: GetUser | any = await jwt.verify(cookie, jwtSecret)
    console.log(user)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getUser