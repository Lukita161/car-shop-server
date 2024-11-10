"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTheOwner = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../Models/Admin");
const verifyToken = (req, userId) => {
    const token = req.headers.authorization;
    const bearerToken = token.split(" ")[1];
    const result = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT);
    // @ts-ignore
    if (result.id !== userId) {
        //throw new Error('No tienes acceso a esta funcion')
        return false;
    }
    return true;
};
exports.verifyToken = verifyToken;
const isTheOwner = async (req) => {
    const token = req.headers.authorization;
    const bearerToken = token.split(" ")[1];
    const result = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT);
    // @ts-ignore
    const user = await Admin_1.AdminModel.findById(result.id);
    return user.isTheOwner ? true : false;
};
exports.isTheOwner = isTheOwner;
//# sourceMappingURL=verifyToken.js.map