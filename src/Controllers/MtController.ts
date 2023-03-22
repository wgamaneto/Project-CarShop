import { NextFunction, Request, Response } from 'express';
import IMoto from '../Interfaces/IMotorcycle';
import MotoService from '../Services/MotoService';

const invalidMongo = 'Invalid mongo id';
const motoNotFound = 'Motorcycle not found';

class MtController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotoService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotoService();
  }
  public async findAll() {
    try {
      const motos = await this.service.findAll();
      return this.res.status(200).json(motos);
    } catch (error) {
      this.next(error);
    }
  }
  public async findById() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.findById(id);
      if (moto === undefined) {
        return this.res.status(422)
          .json({ message: invalidMongo });
      }
      if (moto.length === 0) {
        return this.res.status(404)
          .json({ message: motoNotFound });
      }
      return this.res.status(200).json(...moto);
    } catch (error) {
      this.next(error);
    }
  }
  public async create() {
    if (!this.req.body.status) this.req.body.status = false;
    const moto: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }
  public async update() {
    if (!this.req.body.status) this.req.body.status = false;
    const moto: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const { id } = this.req.params;
    try {
      const updatedMoto = await this.service.update(id, moto);
      if (updatedMoto === null) {
        return this.res.status(404)
          .json({ message: motoNotFound });
      }
      return this.res.status(200).json(updatedMoto);
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
          .json({ message: motoNotFound });
      }
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.res.status(422)
        .json({ message: invalidMongo });
    }
  }
}

export default MtController;