import { type Request, type Response } from 'express';
export declare class CarController {
    static createCar: (req: Request, res: Response) => Promise<void>;
    static getAllCars: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getCars: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getTopCars: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getCarById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getCarByBrand: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteCar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static modifyTheCar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updateAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static countCars: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
