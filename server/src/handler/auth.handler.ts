import jwt from "jsonwebtoken";

export default function JWTtokenHandler() {
  return {
    generateRefreshToken: async (payload: {
      userID: string | number;
      email: string;
    }) => {
      const secret = process.env.JWT_SECRET_SESSION!;
      const decode = jwt.sign({ payload }, secret);
      return decode;
    },
    verifyRefreshToken: async (token: string) => {
      const secret = process.env.JWT_SECRET_SESSION!;

      try {
        const decoded = jwt.verify(token, secret);
        return decoded;
      } catch (error: any) {
        // Handle verification failure, e.g., token expired or invalid
        console.error("Token verification failed:", error.message);
        return null;
      }
    },
  };
}
