import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const ValidateUserSignIn = (
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
    const result = jwt.verify(bearerToken, "secretpass");
    if (!result) {
        res.status(401).send("No tienes acceso para utilizar esta funcion");
    }
    next();
  } catch (error) {
    res.status(401).send('Ha ocurrido un error, posiblemente no estes logueado')
  }
};
