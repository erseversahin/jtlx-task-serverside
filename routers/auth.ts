import {Router} from "express";
import { login, logout, register,verify } from "../controllers/auth";
import { getAccessToRoute } from "../middlewares/auth/auth";
import {limitAccess} from "../middlewares/auth/limitAccess";
const router = Router();


router.post('/register',register)
router.post('/login',limitAccess({
    windowMs:  60 * 1000,
    max: 3,
    message: "Too much login attempt, please try again after 1 minutes"
}),login)
router.get('/logout',getAccessToRoute,logout)
router.get('/verify',getAccessToRoute,verify)

export default router;
