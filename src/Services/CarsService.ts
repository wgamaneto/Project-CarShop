import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarsService {
  private createCar(car: ICar): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async findAll() {
    const carODM = new CarODM();
    const cars = await carODM.findAll();
    const carsArray = cars.map((car) =>
      this.createCar(car));
    return carsArray;
  }

  public async findById(id: string) {
    const carODM = new CarODM();
    const cars = await carODM.findById(id);
    if (cars === undefined) return undefined;
    const carsArray = cars.map((car) =>
      this.createCar(car));
    return carsArray;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCar(newCar);
  }

  public async update(id: string, car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.update(id, car);
    if (newCar === null) return null;
    return this.createCar(newCar);
  }

  public async delete(id: string): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.delete(id);
    if (newCar === null) return null;
    return this.createCar(newCar);
  }
}

export default CarsService;