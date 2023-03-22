import IVehicle from './IVehicles';

interface IMotorcycle extends IVehicle {
  category: string;
  engineCapacity: number;
}

export default IMotorcycle;