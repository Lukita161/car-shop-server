import { Request, Response } from "express";
export declare class AdminController {
    static createAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getAdminInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getAllAdminsInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static logInAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static changeCredentials: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
