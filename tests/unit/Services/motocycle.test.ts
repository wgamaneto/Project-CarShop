import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotoService from '../../../src/Services/MotoService';
import Motorcycle from '../../../src/Domains/Motorcycle';

const resultMockMotorcycle: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

describe('Service Motorcycle', function () {
  afterEach(function () {
    sinon.restore();
  }); 

  it('Deveria criar uma moto com SUCESSO', async function () {
    // Arrange
    const entry: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const out: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      ...entry,
    });
    sinon.stub(Model, 'create').resolves(out);

    // Act
    const service = new MotoService();
    const result = await service.create(entry);

    // Assert
    expect(result).to.be.deep.equal(out);    
  });

  it('Deveria buscar todas as motor com SUCESSO', async function () {
    const out: Motorcycle[] = resultMockMotorcycle.map((motorcycle) => {
      const result = new Motorcycle(motorcycle);
      return result;
    });

    sinon.stub(Model, 'find').resolves(resultMockMotorcycle);

    const service = new MotoService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(out);    
  });

  it('Deveria buscar a moto por ID com SUCESSO', async function () {
    const id = '6348513f34c397abcad040b2';
    const out: Motorcycle = new Motorcycle({
      ...resultMockMotorcycle[0],
    });

    sinon.stub(Model, 'find').resolves([resultMockMotorcycle[0]]);

    const service = new MotoService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal([out]);    
  });

  it('Deveria deletar a moto por ID com SUCESSO', async function () {
    const id = '6348513f34c397abcad040b2';
    const out: Motorcycle = new Motorcycle({
      ...resultMockMotorcycle[0],
    });

    sinon.stub(Model, 'findByIdAndDelete').resolves(resultMockMotorcycle[0]);

    const service = new MotoService();
    const result = await service.delete(id);

    expect(result).to.be.deep.equal(out);    
  });
});