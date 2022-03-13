import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import CustomError from "../helpers/error/CustomError";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

export const register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        let age;
        if (req.body.bornAt){
            let now = new Date().getFullYear();
            let burn = new Date(req.body.bornAt).getFullYear();
            age = now-burn
        }
        const model = new UserModel({
            location: {
                type: "Point",
                coordinates: req.body.coordinates
            },
            name: req.body.name,
            about: req.body.about,
            age:age,
            surname: req.body.surname,
            email: req.body.email,
            bornAt: req.body.bornAt,
            balance: req.body.balance,
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
        });
        const addedData = await model.save();
        sendJwt(addedData, res);
    }
);



const sendJwt = (user: any, res: Response) => {
    const token: string = user.generateJwtFromUser();
    const { JWT_COOKIE, ENV }: any = process.env;
    let cookie_expire: any = new Date(
        Date.now() + parseInt(JWT_COOKIE) * 1000 * 60
    );

    return res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: cookie_expire,
            secure: ENV == "DEVELOPMENT" ? false : true,
        })
        .json({
            success: true,
            access_token: token,
            userData: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
        });
};

export const login = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new CustomError("Please provide username and password", 400));
        }

        const userData = await UserModel.findOne({ username }).select("+password");

        if (!userData) {
            return next(new CustomError("Please check your credentials.", 400));
        }

        const hashedPassword: any = userData.password;

        if (!bcrypt.compareSync(password, hashedPassword)) {
            return next(new CustomError("Please check your credentials.", 400));
        }

        sendJwt(userData, res);
    }
);

export const logout = (req: Request, res: Response) => {
    const { ENV } = process.env;

    return res
        .status(200)
        .cookie("access_token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: ENV == "DEVELOPMENT" ? false : true,
        })
        .json({
            success: true,
            message: "Logged out!",
        });
};
