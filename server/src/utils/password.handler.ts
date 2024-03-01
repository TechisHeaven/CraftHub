import bcrypt from "bcryptjs";
import { CreateError } from "./errorMessage.handler";
import statusHandler from "./status.handler";

export const bycrptPassword = (password: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    if (!hash) {
      throw CreateError(
        statusHandler.internalServerError.code,
        statusHandler.internalServerError.message
      );
    }
    return hash;
  } catch (error) {
    throw CreateError(
      statusHandler.internalServerError.code,
      statusHandler.internalServerError.message
    );
  }
};

export const comparePassword = async ({
  reqBodyPassword,
  userPassword,
}: {
  reqBodyPassword: string;
  userPassword: string;
}) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(
      reqBodyPassword,
      userPassword
    );
    return isPasswordCorrect;
  } catch (error) {
    throw CreateError(statusHandler.badRequest.code, "Wrong password");
  }
};
