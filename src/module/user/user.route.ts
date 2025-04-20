import { Router } from "express";
import { UserController } from "./user.controller";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyCustomer from "../../middlewares/verifyCustomer";
import verifyUserOrAdmin from "../../middlewares/verifyUserOrAdmin";


const UserRouter = Router();

UserRouter.get("/all", verifyAdmin, UserController.getAllUsers);
UserRouter.get('/getSingle/:email', verifyUserOrAdmin, UserController.getSingleUser);
UserRouter.patch('/update', verifyAdmin, UserController.updateUserStatus);
UserRouter.patch('/update/user', verifyCustomer,  UserController.updateUserProfile);
UserRouter.patch('/update/password', verifyCustomer,  UserController.updateUserPassword);
UserRouter.patch("/admin/change-user-role",verifyAdmin,UserController.changeUserRole);

export default UserRouter