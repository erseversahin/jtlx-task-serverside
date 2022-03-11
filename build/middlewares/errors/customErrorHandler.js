"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorHandler = void 0;
const CustomError_1 = __importDefault(require("../../helpers/error/CustomError"));
const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    if (err.name === "SyntaxError") {
    }
    if (err.name === "ValidationError") {
        customError = new CustomError_1.default(err.message, 400);
    }
    if (err.name === "CastError") {
        customError = new CustomError_1.default('Please provide a valid field', 400);
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        if (err.keyValue && err.keyValue.email) {
            customError = new CustomError_1.default(`E-mail has already been registered. This field must be unique.`, 400);
        }
        else if (err.keyValue && err.keyValue.username) {
            customError = new CustomError_1.default(`Provided username has already been registered. This field must be unique.`, 400);
        }
        else {
            customError = new CustomError_1.default(`Field has already been registered. This field must be unique.`, 400);
        }
    }
    console.info('ERROR DETAIL', err);
    const message = customError.message || "Something went wrong!";
    const status = customError.status || 500;
    res.status(status).json({
        success: false,
        message
    });
};
exports.customErrorHandler = customErrorHandler;
