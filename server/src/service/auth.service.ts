import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { user } from "../db/schemas/schema";
import JWTtokenHandler from "../handler/auth.handler";
import { CreateError } from "../utils/errorMessage.handler";
import { bycrptPassword, comparePassword } from "../utils/password.handler";
import statusHandler from "../utils/status.handler";
import uuid4 from "uuid4";
import { UserReturn } from "../types/auth.type";

const AuthService = {
  //assign type later
  loginUserService: async (userData: { email: string; password: string }) => {
    const result: UserReturn[] = await db
      .select({
        userID: user.userID,
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .from(user)
      .where(eq(user.email, userData.email));
    if (!result || result.length === 0) {
      throw CreateError(404, "User not Found");
    }
    const isPasswordCorrect = await comparePassword({
      reqBodyPassword: userData.password,
      userPassword: result[0].password,
    });

    if (!isPasswordCorrect) {
      throw CreateError(statusHandler.unauthorized.code, "Wrong Password");
    }

    const sessionToken = await JWTtokenHandler().generateRefreshToken({
      userID: result[0].userID,
      email: result[0].email,
    });
    return { ...result[0], sessionToken };
  },
  registerUserService: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const isUserExists = await db
      .select({
        email: user.email,
      })
      .from(user)
      .where(eq(user.email, userData.email));
    if (isUserExists && isUserExists.length > 0) {
      throw CreateError(statusHandler.badRequest.code, "User Already Exists");
    }
    const password = await bycrptPassword(userData.password);

    if (!password) {
      throw CreateError(statusHandler.conflict.code, "Something Went Wrong");
    }

    // Generate a new UUID
    const userID = uuid4();
    const result = await db.insert(user).values({
      userID,
      name: userData.name,
      email: userData.email,
      password: password,
    });

    if (!result) {
      throw CreateError(
        statusHandler.conflict.code,
        "User not Created" + statusHandler.conflict.message
      );
    }

    const userResult: UserReturn[] = await db
      .select({
        userID: user.userID,
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .from(user)
      .where(eq(user.email, userData.email));

    const sessionToken = await JWTtokenHandler().generateRefreshToken({
      userID: userResult[0].userID,
      email: userResult[0].email,
    });
    return { ...userResult[0], sessionToken };
  },
};

export default AuthService;
