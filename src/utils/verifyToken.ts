import { Request } from "express"
import jwt from 'jsonwebtoken'
import { AdminCredentials } from "../types"
import { AdminModel } from "../Models/Admin"

export const verifyToken = (req:Request, userId: AdminCredentials['id'])=> {
    const token = req.headers.authorization
    const bearerToken = token.split(" ")[1]
    const result = jwt.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT)

    // @ts-ignore
    if(result.id !== userId) {
        //throw new Error('No tienes acceso a esta funcion')
        return false
    }
    return true
}

export const isTheOwner = async(req:Request)=> {
    const token = req.headers.authorization
    const bearerToken = token.split(" ")[1]
    const result = jwt.verify(bearerToken, process.env.SECRET_PASS_FOR_JWT)
    // @ts-ignore
    const user = await AdminModel.findById(result.id)
    return user.isTheOwner ? true : false
}