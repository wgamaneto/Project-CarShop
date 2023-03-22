import { Schema, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcicle';
import AbstractODM from './AbstractODM';

class MotoODM extends AbstractODM<IMotorcycle> {
  constructor() {
    super();
    super.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
}

export default MotoODM;