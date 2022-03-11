"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const CustomError_1 = __importDefault(require("../../helpers/error/CustomError"));
const storage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./public/uploads");
    },
    filename: (request, file, callback) => {
        const extension = file.mimetype.split("/")[1];
        callback(null, "image_" + Date.now() + "_" + request.user.id + "." + extension);
    }
});
const fileFilter = (request, file, callback) => {
    const allowedTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        let error = new CustomError_1.default("Please provide a valid image file", 400);
        return callback(error, false);
    }
    return callback(null, true);
};
exports.photoUpload = (0, multer_1.default)({ storage, fileFilter });
