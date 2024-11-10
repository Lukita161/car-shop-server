"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../Models/Admin");
const ValidateUserSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("No tienes acceso");
        }
        const bearerToken = token.split(" ")[1];
        if (bearerToken === undefined) {
            return res.status(401).send("No tienes acceso a esta funcion");
        }
        const result = jsonwebtoken_1.default.decode(bearerToken);
        if (!result) {
            res.status(401).send("No tienes acceso para utilizar esta funcion");
        }
        const admin = await Admin_1.AdminModel.findById(result.id).select('email userName isTheOwner password');
        req.admin = admin;
        if (!admin) {
            return res.status(404).send('El usuario no existe, inicia sesion');
        }
        next();
    }
    catch (error) {
        res.status(401).send('Ha ocurrido un error, posiblemente no estes logueado');
    }
};
exports.ValidateUserSignIn = ValidateUserSignIn;
//# sourceMappingURL=ValidatingToken.js.map