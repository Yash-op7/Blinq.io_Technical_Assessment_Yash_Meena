import express from "express";
import authController from "../controllers/authController.js";
import { validateSignupSchema, validateLoginSchema } from "../middlewares/validator.js";
import {userExists, userDoesNotExist} from "../middlewares/userExists.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.post("/signup", validateSignupSchema, userExists, authController.signup);
router.post("/login", validateLoginSchema, userDoesNotExist, authController.login);
router.post("/logout", isAuthorized ,authController.logout);

export { router };
