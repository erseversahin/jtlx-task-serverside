import {Router, Request, Response, NextFunction} from "express";
import { listUser,addUser,editUser,removeUser,getUser } from "../controllers/user";
import { photoUpload } from '../middlewares/libs/multer';
import { getAccessToRoute } from "../middlewares/auth/auth";
const router = Router();


router.get('/',[getAccessToRoute],listUser)
router.get('/:id',[getAccessToRoute],getUser)
router.post('/',[getAccessToRoute],addUser)
router.put('/:id',[getAccessToRoute],editUser)
router.delete('/:id',[getAccessToRoute],removeUser)


export default router;
