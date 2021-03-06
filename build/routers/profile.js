"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = require("../controllers/profile");
const multer_1 = require("../middlewares/libs/multer");
const auth_1 = require("../middlewares/auth/auth");
const router = (0, express_1.Router)();
router.get('/', [auth_1.getAccessToRoute], profile_1.getProfile);
router.post('/upload', [auth_1.getAccessToRoute, multer_1.photoUpload.single("profile_image")], profile_1.uploadImage);
router.put('/', [auth_1.getAccessToRoute], profile_1.editProfile);
exports.default = router;
