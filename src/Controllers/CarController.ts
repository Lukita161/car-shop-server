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
  
  static getCars = async (req: Request, res: Response) => {
    const { page } = req.params
    const pageSize = 30
    const cars = await CarModel.find().skip((+page-1)*pageSize).limit(pageSize)
    if (cars.length === 0) {
      return res.status(400).send('No hay autos disponibles aun')
    }
    res.json(cars)
  }
  static getTopCars = async(req:Request, res:Response) => {
    const cars = await CarModel.find().sort({price: 'desc'}).limit(8)
    if (cars.length < 0) {
      return res.status(404).send('No hay autos disponibles aun')
    }
    res.json(cars)
  }

  static getCarById = async (req: Request, res: Response) => {
    const { id } = req.params
    const car = await CarModel.findById(id)
    if (!car) {
      return res.status(404).send('No se ha encontrado nada')
    }
    res.json(car)
  }
  static getCarByBrand = async (req:Request, res:Response) => {
    const { brand } = req.params
    const cars = await CarModel.find({brand})
    if(cars.length===0) {
      return res.status(404).send('No hay vehiculos de esta marca')
    }
    
    res.json(cars)
  }
  static deleteCar = async(req: Request, res: Response)=> {
    const { id } = req.params
    const car = await CarModel.findById(id)
    if(!car) {
      return res.status(400).send('Auto no encontrado')
    }
    await car.deleteOne()
    res.send('Eliminado correctamente')
  }
  static modifyTheCar = async(req: Request, res:Response) => {
    const { id } = req.params
    if(req.body.length < 0) {
      return res.status(400).send('No puedes enviar una solicitud vacia')
    }
    const car = await CarModel.findById(id)
    if(!car) {
      return res.status(404).send('No encontramos el vehiculo')
    }
    await car.updateOne(req.body)
    res.send('Producto actualizado')
  }
  static updateAvailability = async(req:Request, res:Response) => {
    const { id } = req.params
    const car = await CarModel.findById(id)
    if(!car) {
      return res.status(404).send('Producto no encontrado')
    }
    car.availability = !car.availability
    await car.save()
    res.send('Disponibilidad actualizada')
  }
  static countCars = async(req: Request, res:Response)=> {
    const cars = await CarModel.countDocuments()
    if(!cars) {
      return res.status(404).send('No hay registros')
    }
    res.json(cars)
  }
}
