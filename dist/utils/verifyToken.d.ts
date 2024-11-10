import { Request } from "express";
import { AdminCredentials } from "../types";
export declare const verifyToken: (req: Request, userId: AdminCredentials["id"]) => boolean;
export declare const isTheOwner: (req: Request) => Promise<boolean>;
