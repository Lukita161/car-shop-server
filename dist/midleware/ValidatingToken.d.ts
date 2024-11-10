import { Request, Response, NextFunction } from "express";
import { AdminInfoToken } from "../types";
declare global {
    namespace Express {
        interface Request {
            admin: AdminInfoToken;
        }
    }
}
export declare const ValidateUserSignIn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
