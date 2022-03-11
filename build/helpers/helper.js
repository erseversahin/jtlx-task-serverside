"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validatePassword = void 0;
function validatePassword(password) {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}
exports.validatePassword = validatePassword;
function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
exports.validateEmail = validateEmail;
