import { Router } from "express";
import { param } from "express-validator";
import { handleErrors } from "../midleware/validation";
import { CarPublicController } from "../Controllers/CarPublicController";
import { brand } from "../Models/Car";

const publicRouter = Router()

publicRouter.get('/car/:id', 
    param('id').isMongoId().notEmpty().withMessage('No puede ir vacio'),
    handleErrors,
    CarPublicController.getCarById
)

publicRouter.get('/car/pages/:pages',
    param('pages').notEmpty().withMessage('No puede ir vacio'),
    handleErrors,
    CarPublicController.getCarsByPages
)
publicRouter.get('/topCars',CarPublicController.getTopCars)
publicRouter.get('/car/filters/:brand',
    param('brand').custom(value => {
        if(!brand.includes(value)) {
          throw new Error('The brand does exist in the DB')
        }
        return true
      }).notEmpty().withMessage('El parametro es obligatorio'),
      handleErrors,
      CarPublicController.getCarByBrand
)
publicRouter.get('/car',
    handleErrors,
    CarPublicController.countCars
)

export default publicRouter