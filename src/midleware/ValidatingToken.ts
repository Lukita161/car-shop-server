import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AdminModel } from "../Models/Admin";
import { AdminCredentials, AdminInfoToken, AdminToken } from "../types";

declare global {
  namespace Express {
    interface Request {
      admin: AdminInfoToken
    }
  }
}

export const ValidateUserSignIn = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("No tienes acceso");
    }
    const bearerToken = token.split(" ")[1];
    if (bearerToken === undefined) {
      return res.status(401).send("No tienes acceso a esta funcion");
    }
    const result = jwt.decode(bearerToken) as AdminToken;
    if (!result) {
        res.status(401).send("No tienes acceso para utilizar esta funcion");
    }
    const admin = await AdminModel.findById(result.id).select('email userName isTheOwner password')
    req.admin = admin
    if(!admin) {
      return res.status(404).send('El usuario no existe, inicia sesion')
    }
    next();
  } catch (error) {
    res.status(401).send('Ha ocurrido un error, posiblemente no estes logueado')
  }
};
