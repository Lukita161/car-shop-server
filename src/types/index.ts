import { JwtPayload } from "jsonwebtoken"

export type AdminToken = JwtPayload & {
    email: string,
    iat: number,
    exp: number
}

export type AdminCredentials = {
    email: string,
    password: string,
    userName: string
}