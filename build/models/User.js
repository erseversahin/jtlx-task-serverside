"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const helper_1 = require("../helpers/helper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Please provide a name"] },
    surname: { type: String, required: [true, "Please provide a surname"] },
    age: { type: Number },
    bornAt: { type: Date },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    about: { type: String },
    image: { type: String, default: "profile.jpg" },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [helper_1.validateEmail, 'Please provide a valid password.'],
    },
    balance: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        validate: [helper_1.validatePassword, 'Your password must be at least 8 characters, with at least a symbol, upper and lower case letters and a number.'],
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide a phone number"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide a username"]
    },
    createdAt: {
        type: Date, default: Date.now
    }
});
UserSchema.index({ location: "2dsphere" });
UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this.id,
        username: this.username
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
    return token;
};
UserSchema.pre("save", function (next) {
    if (!this.isModified('password'))
        next();
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        let password = this.password;
        if (err)
            next(err);
        bcryptjs_1.default.hash(password, salt, (err, hash) => {
            if (err)
                next(err);
            this.password = hash;
            next();
        });
    });
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
