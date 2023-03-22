import Moto from '../Domains/Motorcycle';
import IMoto from '../Interfaces/IMotorcycle';
import MotoODM from '../Models/MotoODM';

class MotoService {
  private createMoto(moto: IMoto): Moto | null {
    if (moto) {
      return new Moto(moto);
    }
    return null;
  }

  public async findAll() {
    const motoODM = new MotoODM();
    const motos = await motoODM.findAll();
    const motosArray = motos.map((moto) =>
      this.createMoto(moto));
    return motosArray;
  }

  public async findById(id: string) {
    const motoODM = new MotoODM();
    const motos = await motoODM.findById(id);
    
    if (motos === undefined) return undefined;
    const motosArray = motos.map((moto) =>
      this.createMoto(moto));
    return motosArray;
  }

  public async create(moto: IMoto) {
    const motoODM = new MotoODM();
    const newMoto = await motoODM.create(moto);
    return this.createMoto(newMoto);
  }

  public async update(id: string, moto: IMoto): Promise<Moto | null> {
    const motoODM = new MotoODM();
    const newMoto = await motoODM.update(id, moto);
    if (newMoto === null) return null;
    return this.createMoto(newMoto);
  }

  public async delete(id: string): Promise<Moto | null> {
    const motoODM = new MotoODM();
    const newMoto = await motoODM.delete(id);
    if (newMoto === null) return null;
    return this.createMoto(newMoto);
  }
}

export default MotoService;