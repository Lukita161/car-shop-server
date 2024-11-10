"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const CarController_1 = require("../Controllers/CarController");
const validation_1 = require("../midleware/validation");
const IsValidId_1 = require("../midleware/IsValidId");
const ValidatingToken_1 = require("../midleware/ValidatingToken");
const Car_1 = require("../Models/Car");
const router = (0, express_1.Router)();
router.use(ValidatingToken_1.ValidateUserSignIn);
router.post('/', (0, express_validator_1.body)('carName').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('brand').custom(value => {
    if (!Car_1.brand.includes(value)) {
        throw new Error('The brand does exist in the DB');
    }
    return true;
}).notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('price').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('description').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('image').notEmpty().withMessage('El campo es obligatorio'), validation_1.handleErrors, CarController_1.CarController.createCar);
router.get('/', CarController_1.CarController.getAllCars);
router.get('/car/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), IsValidId_1.IsValidId, validation_1.handleErrors, CarController_1.CarController.getCarById);
router.get('/car/pages/:page', (0, express_validator_1.param)('page').notEmpty().withMessage('El numero de pagina es obligatorio'), validation_1.handleErrors, CarController_1.CarController.getCars);
router.get('/topCars', validation_1.handleErrors, CarController_1.CarController.getTopCars);
router.get('/car/filters/:brand', (0, express_validator_1.param)('brand').custom(value => {
    if (!Car_1.brand.includes(value)) {
        throw new Error('The brand does exist in the DB');
    }
    return true;
}).notEmpty().withMessage('El parametro es obligatorio'), validation_1.handleErrors, CarController_1.CarController.getCarByBrand);
router.put('/car/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id requerido'), (0, express_validator_1.body)('carName').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('brand').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('price').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('description').notEmpty().withMessage('El campo es obligatorio'), (0, express_validator_1.body)('image').notEmpty().withMessage('El campo es obligatorio'), IsValidId_1.IsValidId, validation_1.handleErrors, CarController_1.CarController.modifyTheCar);
router.patch('/car/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id requerido'), IsValidId_1.IsValidId, validation_1.handleErrors, CarController_1.CarController.updateAvailability);
router.delete('/car/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Campo requerido'), IsValidId_1.IsValidId, validation_1.handleErrors, CarController_1.CarController.deleteCar);
router.get('/car', validation_1.handleErrors, CarController_1.CarController.countCars);
exports.default = router;
//# sourceMappingURL=CarRouter.js.map