import { Router } from "express";
import { body } from "express-validator";
import { handleErrors } from "../midleware/validation";
import { AdminController } from "../Controllers/AdminController";

export const AdminRouter = Router()

AdminRouter.post('/', 
    body('email').notEmpty().withMessage('El campo no puede ir vacio').isEmail().withMessage('Tiene que ser un email'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('userName').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    handleErrors,
    AdminController.createAdmin
)
AdminRouter.post('/login',
    body('email').notEmpty().withMessage('El campo no puede ir vacio').isEmail().withMessage('Tiene que ser un email'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleErrors,
    AdminController.logInAdmin
)


export default AdminRouter