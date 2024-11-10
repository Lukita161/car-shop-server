import { JwtPayload } from "jsonwebtoken";
export type AdminToken = JwtPayload & {
    id: string;
    iat: number;
    exp: number;
};
export type AdminCredentials = {
    id: string;
    email: string;
    password: string;
    userName: string;
};
export type AdminInfoToken = {
    email: string;
    userName: string;
    isTheOwner: boolean;
};
