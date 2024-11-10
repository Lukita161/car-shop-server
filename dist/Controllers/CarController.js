"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const Car_1 = __importDefault(require("../Models/Car"));
class CarController {
    static createCar = async (req, res) => {
        const car = new Car_1.default(req.body);
        if (!car) {
            res.status(500).send('Ha ocurrido un error, revisa los campos');
        }
        await car.save();
        res.send('Producto creado correctamente'); // Set the response here
    };
    static getAllCars = async (req, res) => {
        const cars = await Car_1.default.find();
        if (cars.length < 0) {
            return res.status(400).send('No hay autos disponibles aun');
        }
        res.json(cars);
    };
    static getCars = async (req, res) => {
        const { page } = req.params;
        const pageSize = 30;
        const cars = await Car_1.default.find().skip((+page - 1) * pageSize).limit(pageSize);
        if (cars.length === 0) {
            return res.status(400).send('No hay autos disponibles aun');
        }
        res.json(cars);
    };
    static getTopCars = async (req, res) => {
        const cars = await Car_1.default.find().sort({ price: 'desc' }).limit(8);
        if (cars.length < 0) {
            return res.status(404).send('No hay autos disponibles aun');
        }
        res.json(cars);
    };
    static getCarById = async (req, res) => {
        const { id } = req.params;
        const car = await Car_1.default.findById(id);
        if (!car) {
            return res.status(404).send('No se ha encontrado nada');
        }
        res.json(car);
    };
    static getCarByBrand = async (req, res) => {
        const { brand } = req.params;
        const cars = await Car_1.default.find({ brand });
        if (cars.length === 0) {
            return res.status(404).send('No hay vehiculos de esta marca');
        }
        res.json(cars);
    };
    static deleteCar = async (req, res) => {
        const { id } = req.params;
        const car = await Car_1.default.findById(id);
        if (!car) {
            return res.status(400).send('Auto no encontrado');
        }
        await car.deleteOne();
        res.send('Eliminado correctamente');
    };
    static modifyTheCar = async (req, res) => {
        const { id } = req.params;
        if (req.body.length < 0) {
            return res.status(400).send('No puedes enviar una solicitud vacia');
        }
        const car = await Car_1.default.findById(id);
        if (!car) {
            return res.status(404).send('No encontramos el vehiculo');
        }
        await car.updateOne(req.body);
        res.send('Producto actualizado');
    };
    static updateAvailability = async (req, res) => {
        const { id } = req.params;
        const car = await Car_1.default.findById(id);
        if (!car) {
            return res.status(404).send('Producto no encontrado');
        }
        car.availability = !car.availability;
        await car.save();
        res.send('Disponibilidad actualizada');
    };
    static countCars = async (req, res) => {
        const cars = await Car_1.default.countDocuments();
        if (!cars) {
            return res.status(404).send('No hay registros');
        }
        res.json(cars);
    };
}
exports.CarController = CarController;
//# sourceMappingURL=CarController.js.map