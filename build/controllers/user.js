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
exports.editUser = exports.removeUser = exports.listUser = exports.addUser = exports.getUser = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../helpers/error/CustomError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const userData = yield User_1.UserModel.findOne({ _id: req.params.id });
    if (userData) {
        res.status(200).json({
            success: true,
            userData,
        });
    }
    else {
        return next(new CustomError_1.default("There is no such user.", 400));
    }
}));
exports.addUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const model = new User_1.UserModel(req.body);
    const addedData = yield model.save();
    res.status(200).json({
        success: true,
        addedData,
    });
}));
exports.listUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = {};
    const total = yield User_1.UserModel.countDocuments();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    pagination.total = total;
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        };
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        };
    }
    const users = yield User_1.UserModel.find({}).skip(startIndex).limit(limit).sort([['createdAt', -1]]);
    if (users) {
        res.status(200).json({
            success: true,
            users,
            count: express_1.query.length,
            pagination
        });
    }
    else {
        return next(new CustomError_1.default("There is no such user.", 400));
    }
}));
exports.removeUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield User_1.UserModel.remove({ _id: req.params.id });
    if (userData) {
        res.status(200).json(Object.assign({ success: true, message: "User deleted" }, userData));
    }
    return next(new CustomError_1.default("There is no such user.", 400));
}));
exports.editUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let age;
    if (req.body.bornAt) {
        let now = new Date().getFullYear();
        let burn = new Date(req.body.bornAt).getFullYear();
        age = now - burn;
    }
    const user = yield User_1.UserModel.findByIdAndUpdate(req.user.id, {
        location: {
            type: "Point",
            coordinates: req.body.coordinates
        },
        name: req.body.name,
        about: req.body.about, age: age,
        surname: req.body.surname,
        email: req.body.email,
        bornAt: req.body.bornAt,
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
