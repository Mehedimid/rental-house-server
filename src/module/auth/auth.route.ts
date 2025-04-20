import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const AuthRouter = Router();

AuthRouter.post('/register',
  validateRequest(AuthValidation.RegisterValidationSchema),
  AuthController.createUser,);


AuthRouter.post('/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,);

export default AuthRouter
