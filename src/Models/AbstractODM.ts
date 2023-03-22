import { Model, Schema, model, models, isValidObjectId } from 'mongoose';

abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor() {
    this.schema = new Schema({});
    this.model = models.Vehicle || model('Vehicle', this.schema);
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T[] | undefined> {
    if (!isValidObjectId(id)) return undefined;
    return this.model.find({ _id: id });
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async update(id: string, vehicle: object) {
    if (!isValidObjectId(id)) throw Error('Invalid Mongo ID');
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...vehicle },
      { new: true },
    );
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) throw Error('Invalid Mongo ID');
    return this.model.findByIdAndDelete({ _id: id });
  }
}

export default AbstractODM;