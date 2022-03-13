"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth/auth");
const limitAccess_1 = require("../middlewares/auth/limitAccess");
const router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', (0, limitAccess_1.limitAccess)({
    windowMs: 60 * 1000,
    max: 3,
    message: "Too much login attempt, please try again after 1 minutes"
}), auth_1.login);
router.get('/logout', auth_2.getAccessToRoute, auth_1.logout);
router.get('/verify', auth_2.getAccessToRoute, auth_1.verify);
exports.default = router;
