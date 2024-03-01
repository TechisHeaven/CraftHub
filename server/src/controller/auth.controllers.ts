import { NextFunction, Request, Response } from "express";
import statusHandler from "../utils/status.handler";
import AuthService, { UserReturn } from "../service/auth.service";
import { CreateError } from "../utils/errorMessage.handler";

export default function authController() {
  return {
    userLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          throw CreateError(404, "Email and password must be provided");
        }

        const user: UserReturn[] = await AuthService().loginUserService({
          email,
          password,
        });
        if (!user) {
          throw CreateError(500, "Failed to Login");
        }

        res
          .cookie("sessionToken", user[0].sessionToken, { httpOnly: true })
          .status(statusHandler.ok.code)
          .json({
            success: true,
            status: statusHandler.ok.code,
            message: "Login successfuly!",
            user: {
              id: user[0].id,
              name: user[0].name,
              email: user[0].email,
            },
            sessionToken: user[0].sessionToken,
          });
      } catch (err) {
        next(err);
      }
    },
  };
}
