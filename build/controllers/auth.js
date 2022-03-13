"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../helpers/error/CustomError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let age;
    if (req.body.bornAt) {
        let now = new Date().getFullYear();
        let burn = new Date(req.body.bornAt).getFullYear();
        age = now - burn;
    }
    const model = new User_1.UserModel({
        location: {
            type: "Point",
            coordinates: req.body.coordinates
        },
        name: req.body.name,
        about: req.body.about,
        age: age,
        surname: req.body.surname,
        email: req.body.email,
        bornAt: req.body.bornAt,
        balance: req.body.balance,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
    });
    const addedData = yield model.save();
    sendJwt(addedData, res);
}));
const sendJwt = (user, res) => {
    const token = user.generateJwtFromUser();
    const { JWT_COOKIE, ENV } = process.env;
    let cookie_expire = new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60);
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
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new CustomError_1.default("Please provide username and password", 400));
    }
    const userData = yield User_1.UserModel.findOne({ username }).select("+password");
    if (!userData) {
        return next(new CustomError_1.default("Please check your credentials.", 400));
    }
    const hashedPassword = userData.password;
    if (!bcryptjs_1.default.compareSync(password, hashedPassword)) {
        return next(new CustomError_1.default("Please check your credentials.", 400));
    }
    sendJwt(userData, res);
}));
const logout = (req, res) => {
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
exports.logout = logout;
