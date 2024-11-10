"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../midleware/validation");
const AdminController_1 = require("../Controllers/AdminController");
const ValidatingToken_1 = require("../midleware/ValidatingToken");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.post('/register', (0, express_validator_1.body)('email').notEmpty().withMessage('El campo no puede ir vacio').isEmail().withMessage('Tiene que ser un email'), (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es obligatoria'), (0, express_validator_1.body)('userName').notEmpty().withMessage('El nombre de usuario es obligatorio'), validation_1.handleErrors, ValidatingToken_1.ValidateUserSignIn, AdminController_1.AdminController.createAdmin);
exports.AdminRouter.get('/', validation_1.handleErrors, ValidatingToken_1.ValidateUserSignIn, AdminController_1.AdminController.getAdminInfo);
exports.AdminRouter.get('/get-admins', validation_1.handleErrors, ValidatingToken_1.ValidateUserSignIn, AdminController_1.AdminController.getAllAdminsInfo);
exports.AdminRouter.post('/login', (0, express_validator_1.body)('email').notEmpty().withMessage('El campo no puede ir vacio').isEmail().withMessage('Tiene que ser un email'), (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es obligatoria'), validation_1.handleErrors, AdminController_1.AdminController.logInAdmin);
exports.AdminRouter.put('/change-credentials/:userId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Id no valido').notEmpty().withMessage('No puede ir vacio'), (0, express_validator_1.body)('email').notEmpty().withMessage('El campo no puede ir vacio').isEmail().withMessage('Tiene que ser un email'), (0, express_validator_1.body)('userName').notEmpty().withMessage('El nombre de usuario es obligatorio'), validation_1.handleErrors, ValidatingToken_1.ValidateUserSignIn, AdminController_1.AdminController.changeCredentials);
exports.AdminRouter.delete('/:userId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Id no valido').notEmpty().withMessage('No puede ir vacio'), validation_1.handleErrors, ValidatingToken_1.ValidateUserSignIn, AdminController_1.AdminController.deleteAdmin);
exports.default = exports.AdminRouter;
//# sourceMappingURL=AdminRouter.js.map