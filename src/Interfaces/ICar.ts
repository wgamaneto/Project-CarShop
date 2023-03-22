import IVehicle from './IVehicles';

interface ICar extends IVehicle {
  doorsQty: number;
  seatsQty: number;
}

export default ICar;