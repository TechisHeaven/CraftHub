import express from "express";
// import {
//   schoolLogin,
//   schoolRegistration,
// } from "../controllers/authentication/controller.auth";
// import { protectRoute } from "../middlewares/middleware.auth";
import authController from "../controller/auth.controllers";

const router = express.Router();

//? create all auth routes here
//*login user route
router.route("/login").post(authController().userLogin);
//*register user route
router.route("/register").post(authController().userLogin);

module.exports = router;
