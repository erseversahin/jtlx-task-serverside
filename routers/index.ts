import {Router,Request,Response, NextFunction} from "express";
import auth from './auth';
import user from './user';
import profile from './profile';
const router = Router();

router.get('/test',(req:Request,res:Response)=>{
    res.status(200).json({
        status: 'success',
        message: 'Server UP!',
        req:req.headers
    })
})

router.use("/user",user)
router.use("/auth",auth)
router.use("/profile",profile)

export default router;
