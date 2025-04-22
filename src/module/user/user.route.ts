import { Router } from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyUserOrAdmin from "../../middlewares/verifyUserOrAdmin";
import verifyUser from "../../middlewares/verifyUser";
import { UserController } from "../user/user.controller";



const UserRouter = Router();

UserRouter.get("/all", verifyAdmin, UserController.getAllUsers);
UserRouter.get('/getSingle/:email', verifyUserOrAdmin, UserController.getSingleUser);
UserRouter.patch('/update', verifyAdmin, UserController.updateUserStatus);
UserRouter.patch('/update/user', verifyUser,  UserController.updateUserProfile);
UserRouter.patch('/update/password', verifyUser,  UserController.updateUserPassword);
UserRouter.patch("/admin/change-user-role",verifyAdmin,UserController.changeUserRole);

export default UserRouter