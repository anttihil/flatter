import { Router } from "express";
import { isAdmin, isOwnUser } from "../middleware/authorization";
import { getAdminDashboard } from "../controllers/authController";

const userRouter = Router();

userRouter.route("/admin").get(isAdmin, getAdminDashboard);

userRouter.route("/user/:userId").get(getUserPage);

//usersRouter.route("/:user_name").get(getUserPage);
//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

/* usersRouter.get("/:user_id", usersController.getUserController);

usersRouter.get("/", usersController.getAllUsersController);

usersRouter.post("/", usersController.postUserController);

usersRouter.delete("/:user_id", usersController.deleteUserController);

usersRouter.put("/:user_id", usersController.updateUserController); */

export default usersRouter;
