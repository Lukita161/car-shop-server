"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const Admin_1 = require("../Models/Admin");
const hashPassword_1 = require("../utils/hashPassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("../utils/verifyToken");
class AdminController {
    static createAdmin = async (req, res) => {
        const token = req.headers.authorization;
        const bearerToken = token.split(" ")[1];
        const comparedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT);
        // @ts-ignore
        const isOwner = await Admin_1.AdminModel.findById(comparedToken.id);
        if (!isOwner.isTheOwner)
            return res.status(401).send('No tienes permiso para crear usuarios');
        const admin = new Admin_1.AdminModel(req.body);
        if (!admin) {
            return res.status(500).send('No pudimos procesar tu solicitud');
        }
        admin.password = await (0, hashPassword_1.hashPassword)(admin.password);
        await admin.save();
        res.send('Usuario creado correctamente');
    };
    static getAdminInfo = async (req, res) => {
        const { admin } = req;
        if (!admin) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(admin);
    };
    static getAllAdminsInfo = async (req, res) => {
        const { admin } = req;
        if (!admin)
            return res.status(404).send('Usuario no encontrado');
        if (!admin.isTheOwner)
            return res.status(401).send('No tienes permiso para ver esto');
        const admins = await Admin_1.AdminModel.find().select('email userName isTheOwner');
        if (!admins)
            return res.status(404).send('No hay administradores');
        res.json(admins);
    };
    static logInAdmin = async (req, res) => {
        const { email, password } = req.body;
        const admin = await Admin_1.AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).send('Usuario no encontrado');
        }
        const isPasswordValid = await (0, hashPassword_1.comparePassword)(password, admin.password);
        if (!isPasswordValid) {
            return res.status(404).send('Contraseña invalida');
        }
        const generateToken = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.SECRET_PASS_FOR_JWT, { expiresIn: '24hrs' });
        res.send(generateToken);
    };
    static changeCredentials = async (req, res) => {
        const { email, password, userName } = req.body;
        const { userId } = req.params;
        const admin = await Admin_1.AdminModel.findById(userId);
        const isValidToken = (0, verifyToken_1.verifyToken)(req, admin.id);
        if (!isValidToken) {
            return res.status(401).send('No tienes permiso para ejecutar esta accion');
        }
        if (!admin) {
            return res.status(404).send('No encountred admin');
        }
        admin.email = email;
        admin.userName = userName;
        if (password) {
            const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
            admin.password = hashedPassword;
        }
        await admin.save();
        res.send('Admin actualizado');
    };
    static deleteAdmin = async (req, res) => {
        const { userId } = req.params;
        const admin = await Admin_1.AdminModel.findById(userId);
        const isOwner = await (0, verifyToken_1.isTheOwner)(req);
        if (!isOwner) {
            return res.status(401).send('No tienes permiso para ejecutar esta accion');
        }
        if (!admin) {
            return res.status(404).send('No encontramos nada');
        }
        await admin.deleteOne();
        res.send('Administrador borrado');
    };
}
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map