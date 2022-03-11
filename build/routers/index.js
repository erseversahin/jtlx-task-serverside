"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const profile_1 = __importDefault(require("./profile"));
const router = (0, express_1.Router)();
router.get('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server UP!',
        req: req.headers
    });
});
router.use("/user", user_1.default);
router.use("/auth", auth_1.default);
router.use("/profile", profile_1.default);
exports.default = router;
