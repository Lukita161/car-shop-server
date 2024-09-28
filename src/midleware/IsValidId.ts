import { Request, Response, NextFunction } from "express"

export const IsValidId = (req: Request, res: Response, next: NextFunction)=> {
    const { id } = req.params
    if(!id) {
        return res.status(404).send('El id no existe')
    }
    next()
}