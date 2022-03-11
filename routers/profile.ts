import {Router, Request, Response, NextFunction} from "express";
import { uploadImage,getProfile,editProfile} from "../controllers/profile";
import { photoUpload } from '../middlewares/libs/multer';
import { getAccessToRoute } from "../middlewares/auth/auth";
const router = Router();


router.get('/',[getAccessToRoute],getProfile)
router.post('/upload',[getAccessToRoute, photoUpload.single("profile_image")],uploadImage)
router.put('/',[getAccessToRoute],editProfile)


export default router;
