import { type Request, type Response } from "express";
import CarModel from "../Models/Car";

export class CarPublicController {
  static getCarsByPages = async (req: Request, res: Response) => {
    const { page } = req.params;
    const pageSize = 30;
    const cars = await CarModel.find()
      .skip((+page - 1) * pageSize)
      .limit(pageSize);
    if (cars.length === 0) {
      return res.status(400).send("No hay autos disponibles aun");
    }
    res.json(cars);
  };
  static getTopCars = async (req: Request, res: Response) => {
    const cars = await CarModel.find().sort({ price: "desc" }).limit(8);
    if (cars.length < 0) {
      return res.status(404).send("No hay autos disponibles aun");
    }
    res.json(cars);
  };
  static getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await CarModel.findById(id);
    if (!car) {
      return res.status(404).send("No se ha encontrado nada");
    }
    res.json(car);
  };
  static getCarByBrand = async (req: Request, res: Response) => {
    const { brand } = req.params;
    const cars = await CarModel.find({ brand });
    if (cars.length === 0) {
      return res.status(404).send("No hay vehiculos de esta marca");
    }

    res.json(cars);
  };
  static countCars = async (req: Request, res: Response) => {
    const cars = await CarModel.countDocuments();
    if (!cars) {
      return res.status(404).send("No hay registros");
    }
    res.json(cars);
  };
}
