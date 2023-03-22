import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarsService';

const invalidMongo = 'Invalid mongo id';
const carNotFound = 'Car not found';

class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async findAll() {
    try {
      const cars = await this.service.findAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }
  public async findById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      if (car === undefined) {
        return this.res.status(422)
          .json({ message: invalidMongo });
      }
      if (car.length === 0) {
        return this.res.status(404)
          .json({ message: carNotFound });
      }
      return this.res.status(200).json(...car);
    } catch (error) {
      this.next(error);
    }
  }
  public async create() {
    if (!this.req.body.status) this.req.body.status = false;
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
  public async update() {
    if (!this.req.body.status) this.req.body.status = false;
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const { id } = this.req.params;
    try {
      const updatedCar = await this.service.update(id, car);
      if (updatedCar === null) {
        return this.res.status(404)
          .json({ message: carNotFound });
      }
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.res.status(422)
        .json({ message: invalidMongo });
    }
  }
  public async delete() {
    const { id } = this.req.params;

    try {
      const updatedCar = await this.service.delete(id);
      if (updatedCar === null) {
        return this.res.status(404)
          .json({ message: carNotFound });
      }
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.res.status(422)
        .json({ message: invalidMongo });
    }
  }
}

export default CarsController;