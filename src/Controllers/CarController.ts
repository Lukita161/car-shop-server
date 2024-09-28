import { type Request, type Response } from 'express'
import CarModel from '../Models/Car'

export class CarController {
  static createCar = async (req: Request, res: Response) => {
    const car = new CarModel(req.body)
    if (!car) {
      res.status(500).send('Ha ocurrido un error, revisa los campos')
    }
    await car.save()
    res.send('Producto creado correctamente') // Set the response here
  }

  static getAllCars = async (req: Request, res: Response) => {
    const cars = await CarModel.find()
    if (cars.length < 0) {
      return res.status(400).send('No hay autos disponibles aun')
    }
    res.json(cars)
  }

  static getCarById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).send('Falta el parametro ID')
    };
    const car = await CarModel.findById(id)
    if (!car) {
      return res.status(404).send('No se ha encontrado nada')
    }
    res.json(car)
  }
  static deleteCar = async(req: Request, res: Response)=> {
    const { id } = req.params
    if(!id) {
      return res.status(400).send('Falta el parametro ID')
    }
    const car = await CarModel.findById(id)
    if(!car) {
      return res.status(400).send('Auto no encontrado')
    }
    await car.deleteOne()
    res.send('Eliminado correctamente')
  }
}
