import express from "express";
import { register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { logout } from "../controllers/userController.js";
import { getUser } from "../controllers/userController.js";
import {isAuthorized} from "../middlewares/auth.js";
const router = express.Router();

router.post( "/register",register);
router.post("/login",login);
router.get("/logout",isAuthorized,logout);//get isliye kyuki na humlog data bhej rahe aur na update kar rahe hain
//isAuthorized ko humlog logout ke saath use kar rahe hain kyuki agar cookies hi nahi hoga toh kaha se logout karega banda...toh phir woh unauthorized hua
router.get("/getuser",isAuthorized,getUser);


export default router;