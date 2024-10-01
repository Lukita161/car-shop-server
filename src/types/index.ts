import { JwtPayload } from "jsonwebtoken"

export type AdminToken = JwtPayload & {
    email: string,
    iat: number,
    exp: number
}