import { Request, Response } from "express"
import { AdminModel } from "../Models/Admin"
import { comparePassword, hashPassword } from "../utils/hashPassword"
import jwt from 'jsonwebtoken'

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
}