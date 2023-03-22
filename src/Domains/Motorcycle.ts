import IMotorcycle from '../Interfaces/IMotorcicle';
import Vehicle from './Vehicles';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(
    moto: IMotorcycle,
  ) {
    super(moto);
    this.category = moto.category;
    this.engineCapacity = moto.engineCapacity;
  }
  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
  public getEngineCapacity() {
    return this.engineCapacity;
  }
}

export default Motorcycle;