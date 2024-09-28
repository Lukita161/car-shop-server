import { Router } from 'express'
import { body, param } from 'express-validator'
import { CarController } from '../Controllers/CarController'
import { handleErrors } from '../midleware/validation'
import { IsValidId } from '../midleware/IsValidId'

const router = Router()
router.post(
  '/',
  body('carName').notEmpty().withMessage('El campo es obligatorio'),
  body('brand').notEmpty().withMessage('El campo es obligatorio'),
  body('price').notEmpty().withMessage('El campo es obligatorio'),
  body('description').notEmpty().withMessage('El campo es obligatorio'),
  body('image').notEmpty().withMessage('El campo es obligatorio'),
  handleErrors,
  CarController.createCar
)

router.get('/', CarController.getAllCars)

router.use(IsValidId)

router.get(
  '/car/:id',
  handleErrors,
  CarController.getCarById
)

router.put('/car/:id',
  param('id').isMongoId().withMessage('Id requerido'),
  body('carName').notEmpty().withMessage('El campo es obligatorio'),
  body('brand').notEmpty().withMessage('El campo es obligatorio'),
  body('price').notEmpty().withMessage('El campo es obligatorio'),
  body('description').notEmpty().withMessage('El campo es obligatorio'),
  body('image').notEmpty().withMessage('El campo es obligatorio'),
  handleErrors,
  CarController.modifyTheCar
)

router.patch('/car/:id',
  handleErrors,
  CarController.updateAvailability
)

router.delete('/car/:id',
  param('id').isMongoId().withMessage('Campo requerido'),
  handleErrors,
  CarController.deleteCar
)

export default router
