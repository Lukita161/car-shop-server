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
        // @ts-ignore
        const isOwner = await AdminModel.findById(comparedToken.id)
        if(!isOwner.isTheOwner) return res.status(401).send('No tienes permiso para crear usuarios')
        const admin = new AdminModel(req.body)
        if(!admin) {
            return res.status(500).send('No pudimos procesar tu solicitud')
        }
        admin.password = await hashPassword(admin.password)
        await admin.save()
        res.send('Usuario creado correctamente')
    }
    static getAdminInfo = async(req: Request, res:Response)=> {
        const { admin } = req
        if(!admin) {
            return res.status(404).send('Usuario no encontrado')
        }
        res.json(admin)
    }
    static getAllAdminsInfo = async(req: Request, res:Response) => {
        const { admin } = req
        if(!admin) return res.status(404).send('Usuario no encontrado')
        if(!admin.isTheOwner) return res.status(401).send('No tienes permiso para ver esto')
        const admins = await AdminModel.find().select('email userName isTheOwner')
        if(!admins) return res.status(404).send('No hay administradores')
        res.json(admins)
    }
    static logInAdmin = async(req:Request, res:Response) => {
        const { email, password } = req.body
        const admin = await AdminModel.findOne({email})
        if(!admin) {
            return res.status(404).send('Usuario no encontrado')
        }
        const isPasswordValid = await comparePassword(password, admin.password)
        if(!isPasswordValid) {
            return res.status(404).send('Contraseña invalida')
        }
        
        const generateToken = jwt.sign({id: admin._id}, process.env.SECRET_PASS_FOR_JWT, {expiresIn: '24hrs'})
        res.send(generateToken)
    }
    static changeCredentials = async(req:Request, res:Response)=> {
        const { email, password, userName } = req.body
        const { userId } = req.params
        const admin = await AdminModel.findById(userId)
        const isValidToken = verifyToken(req, admin.id)
        if(!isValidToken) {
            return res.status(401).send('No tienes permiso para ejecutar esta accion')
        }
        if(!admin) {
            return res.status(404).send('No encountred admin')
        }
        admin.email = email
        admin.userName = userName
        if(password) {
            const hashedPassword = await hashPassword(password)
            admin.password = hashedPassword
        }
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
