import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { user } from "../db/schemas/schema";
import JWTtokenHandler from "../handler/auth.handler";
import { CreateError } from "../utils/errorMessage.handler";

export interface UserReturn {
  id: string | number;
  name: string;
  email: string;
  password: string;
  sessionToken?: string;
}

export default function AuthService() {
  return {
    //assign type later
    loginUserService: async (userData: { email: string; password: string }) => {
      const result: UserReturn[] = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .from(user)
        .where(eq(user.email, userData.email));
      console.log(result);
      if (!result || result.length === 0) {
        throw CreateError(404, "User not Found");
      }
      const sessionToken = JWTtokenHandler().generateRefreshToken({
        id: result[0].id,
        email: result[0].email,
      });
      return { ...result, sessionToken };
    },
  };
}
