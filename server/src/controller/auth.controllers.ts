import { NextFunction, Request, Response } from "express";
import statusHandler from "../utils/status.handler";
import AuthService, { UserReturn } from "../service/auth.service";
import { CreateError } from "../utils/errorMessage.handler";
import { comparePassword } from "../utils/password.handler";

export default function authController() {
  return {
    userLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          throw CreateError(404, "Email and password must be provided");
        }

        const user: UserReturn = await AuthService().loginUserService({
          email,
          password,
        });
        console.log(user);
        if (!user) {
          throw CreateError(500, "Failed to Login");
        }

        res
          .cookie("sessionToken", user.sessionToken, { httpOnly: true })
          .status(statusHandler.ok.code)
          .json({
            success: true,
            status: statusHandler.ok.code,
            message: "Login successfuly!",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            sessionToken: user.sessionToken,
          });
      } catch (err) {
        next(err);
      }
    },
    userRegister: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          throw CreateError(404, "All Fields must be provided");
        }

        const user: UserReturn = await AuthService().registerUserService({
          name,
          email,
          password,
        });
        //! remove later consoles
        console.log(user);
        if (!user) {
          throw CreateError(500, "Failed to Register");
        }
        res
          .cookie("sessionToken", user.sessionToken, { httpOnly: true })
          .status(statusHandler.ok.code)
          .json({
            success: true,
            status: statusHandler.created.code,
            message: "Register successfuly!",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            sessionToken: user.sessionToken,
          });
      } catch (error) {
        next(error);
      }
    },
  };
}
