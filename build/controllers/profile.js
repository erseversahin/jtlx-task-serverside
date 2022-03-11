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
exports.editProfile = exports.getProfile = exports.uploadImage = void 0;
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../helpers/error/CustomError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.uploadImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.UserModel.findByIdAndUpdate(req.user.id, {
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
    }, {
        new: true,
        runValidators: true,
    });
    if (user) {
        res.status(200).json({
            success: true,
            image: user.image,
        });
    }
    return next(new CustomError_1.default("Something went wrong!", 400));
}));
exports.getProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.id) {
        const userData = yield User_1.UserModel.findOne({ _id: req.user.id });
        res.status(200).json({
            success: true,
            userData,
        });
    }
    return next(new CustomError_1.default("There is no such user.", 400));
}));
exports.editProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.UserModel.findByIdAndUpdate(req.user.id, {
        location: {
            type: "Point",
            coordinates: req.body.location.coordinates
        },
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        balance: req.body.balance,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
    }, {
        new: true,
        runValidators: true,
    });
    if (user) {
        res.status(200).json({
            success: true,
            user,
        });
    }
    return next(new CustomError_1.default("Something went wrong!", 400));
}));
