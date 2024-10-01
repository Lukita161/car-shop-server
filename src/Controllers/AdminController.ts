import { Request, Response } from "express"
import { AdminModel } from "../Models/Admin"
import { comparePassword, hashPassword } from "../utils/hashPassword"
import jwt from 'jsonwebtoken'
import { isTheOwner, verifyToken } from "../utils/verifyToken"

export class AdminController {
    static createAdmin = async(req:Request, res:Response)=> {
        const token = req.headers.authorization
        const bearerToken = token.split(" ")[1]
        const comparedToken = jwt.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT)
        // Evaluamos si el email del token NO es el email del admin, y tiramos un error
        // @ts-ignore
        if(comparedToken.email !== 'admin@gmail.com') {
            return res.status(401).send('No tienes permiso para crear cuentas')
        }
        
        const admin = new AdminModel(req.body)
        if(!admin) {
            return res.status(500).send('No pudimos procesar tu solicitud')
        }
        admin.password = await hashPassword(admin.password)
        await admin.save()
        res.send('Usuario creado correctamente')
    }
    static logInAdmin = async(req:Request, res:Response) => {
        const { email, password } = req.body
        const admin = await AdminModel.findOne({email})
        const isPasswordValid = await comparePassword(password, admin.password)
        if(!isPasswordValid) {
            return res.status(404).send('Contraseña invalida')
        }
        if(!admin) {
            return res.status(404).send('Usuario no encontrado')
        }
        const generateToken = jwt.sign({email: admin.email}, process.env.SECRET_PASS_FOR_JWT, {expiresIn: '24hrs'})
        res.send(generateToken)
    }
    static changeCredentials = async(req:Request, res:Response)=> {
        const { email, password, userName } = req.body
        const { userId } = req.params
        const admin = await AdminModel.findById(userId)
        const isValidToken = verifyToken(req, admin.email)
        if(!isValidToken) {
            return res.status(401).send('No tienes permiso para ejecutar esta accion')
        }
        if(!admin) {
            return res.status(404).send('No encountred admin')
        }
        admin.email = email
        admin.password = password
        admin.userName = userName
        await admin.save()
        res.send('Admin actualizado')
    }
    static deleteAdmin = async(req: Request, res:Response) => {
        const { userId } = req.params
        const admin = await AdminModel.findById(userId)
        const isOwner = await isTheOwner(req)
        if(!isOwner) {
            return res.status(401).send('No tienes permiso para ejecutar esta accion')
        }
        if(!admin) {
            return res.status(404).send('No encontramos nada')
        }
        await admin.deleteOne()
        res.send('Administrador borrado')
    }
}