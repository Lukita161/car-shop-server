import { Router } from 'express'
import { body, param } from 'express-validator'
import { CarController } from '../Controllers/CarController'
import { handleErrors } from '../midleware/validation'
import { IsValidId } from '../midleware/IsValidId'
import { ValidateUserSignIn } from '../midleware/ValidatingToken'
import { brand } from '../Models/Car'

const router = Router()
//router.use(ValidateUserSignIn)

router.post(
  '/',
  body('carName').notEmpty().withMessage('El campo es obligatorio'),
  body('brand').custom(value => {
    if(!brand.includes(value)) {
      throw new Error('The brand does exist in the DB')
    }
    return true
  }).notEmpty().withMessage('El campo es obligatorio'),
  body('price').notEmpty().withMessage('El campo es obligatorio'),
  body('description').notEmpty().withMessage('El campo es obligatorio'),
  body('image').notEmpty().withMessage('El campo es obligatorio'),
  handleErrors,
  CarController.createCar
)

router.get('/', CarController.getAllCars)


router.get(
  '/car/:id',
  param('id').isMongoId().withMessage('Id no valido'),
  IsValidId,
  handleErrors,
  CarController.getCarById
)

router.get('/car/pages/:page',
  param('page').notEmpty().withMessage('El numero de pagina es obligatorio'),
  handleErrors,
  CarController.getCars
)

router.get('/topCars',
  handleErrors,
  CarController.getTopCars
)

router.get('/car/filters/:brand',
  param('brand').custom(value => {
    if(!brand.includes(value)) {
      throw new Error('The brand does exist in the DB')
    }
    return true
  }).notEmpty().withMessage('El parametro es obligatorio'),
  handleErrors,
  CarController.getCarByBrand
)

router.put('/car/:id',
  param('id').isMongoId().withMessage('Id requerido'),
  body('carName').notEmpty().withMessage('El campo es obligatorio'),
  body('brand').notEmpty().withMessage('El campo es obligatorio'),
  body('price').notEmpty().withMessage('El campo es obligatorio'),
  body('description').notEmpty().withMessage('El campo es obligatorio'),
  body('image').notEmpty().withMessage('El campo es obligatorio'),
  IsValidId,
  handleErrors,
  CarController.modifyTheCar
)

router.patch('/car/:id',
  param('id').isMongoId().withMessage('Id requerido'),
  IsValidId,
  handleErrors,
  CarController.updateAvailability
)

router.delete('/car/:id',
  param('id').isMongoId().withMessage('Campo requerido'),
  IsValidId,
  handleErrors,
  CarController.deleteCar
)

router.get('/car',
  handleErrors,
  CarController.countCars
)

export default router
