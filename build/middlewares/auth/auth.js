"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToRoute = void 0;
const CustomError_1 = __importDefault(require("../../helpers/error/CustomError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getAccessToRoute = (req, res, next) => {
    if (!isTokenIcluded(req)) {
        return next(new CustomError_1.default("You are not authorize to access this route.", 401));
    }
    const { JWT_SECRET_KEY } = process.env;
    const accessToken = getAccessToken(req);
    (0, jsonwebtoken_1.verify)(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(new CustomError_1.default("You are not authorize to access this route.", 401));
        }
        req.user = {
            id: decoded.id,
            username: decoded.username
        };
    });
    next();
};
exports.getAccessToRoute = getAccessToRoute;
const isTokenIcluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer');
};
const getAccessToken = (req) => {
    var _a;
    return (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
};
