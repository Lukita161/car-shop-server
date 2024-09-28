import { Router } from 'express'
import { body, param } from 'express-validator'
import { CarController } from './Controllers/CarController'
import { handleErrors } from './midleware/validation'

const router = Router()

router.post(
  '/',
  body('carName').notEmpty().withMessage('El campo es obligatorio'),
  body('mark').notEmpty().withMessage('El campo es obligatorio'),
  body('price').notEmpty().withMessage('El campo es obligatorio'),
  handleErrors,
  CarController.createCar
)

router.get('/', CarController.getAllCars)
router.get(
  '/car/:id',
  param('id').isMongoId().withMessage('Campo requerido'),
  CarController.getCarById
)

router.delete('/car/:id',
  param('id').isMongoId().withMessage('Campo requerido'),
  CarController.deleteCar
)

export default router
