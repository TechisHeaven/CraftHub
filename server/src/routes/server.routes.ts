import express from "express";
// import { protectRoute } from "../middlewares/middleware.auth";
import serverController from "../controller/server.controller";

const router = express.Router();

//*create server route
router.route("/").post(serverController().create);
//*fetch server route
router.route("/:id").get(serverController().fetchServerByID);
//*fetch servers by id route
router.route("/servers/:id").get(serverController().fetchServersByUserID);
//*Udpdate servers by id route
router.route("/:id").put(serverController().UpdateServer);

module.exports = router;
