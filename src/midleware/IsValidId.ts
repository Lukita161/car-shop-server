import { Request, Response, NextFunction } from "express"

export const IsValidId = (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { id } = req.params
    if(!id) {
        return res.status(404).send('El id no existe')
    }
    next()
    } catch (error) {
        res.status(500).send('Error del servidor')
    }
}