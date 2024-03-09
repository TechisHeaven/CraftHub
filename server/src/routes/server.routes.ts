import express from "express";
// import { protectRoute } from "../middlewares/middleware.auth";
import authController from "../controller/auth.controllers";
import serverController from "../controller/server.controller";

const router = express.Router();

//? create all auth routes here
//*login user route
router.route("/").post(serverController().create);
//*register user route
router.route("/").get(serverController().fetch);

module.exports = router;
