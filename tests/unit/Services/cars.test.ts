import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICars from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarsService';
import Car from '../../../src/Domains/Car';

const resultMockCars: ICars[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

describe('Service Cars', function () {
  afterEach(function () {
    sinon.restore();
  }); 

  it('Deveria criar um carro com SUCESSO', async function () {
    // Arrange
    const entry: ICars = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const out: Car = new Car({
      id: '6348513f34c397abcad040b2',
      ...entry,
    });
    sinon.stub(Model, 'create').resolves(out);

    // Act
    const service = new CarsService();
    const result = await service.create(entry);

    // Assert
    expect(result).to.be.deep.equal(out);    
  });

  it('Deveria buscar todos os carros com SUCESSO', async function () {
    const out: Car[] = resultMockCars.map((car) => {
      const result = new Car(car);
      return result;
    });

    sinon.stub(Model, 'find').resolves(resultMockCars);

    const service = new CarsService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(out);    
  });

  it('Deveria buscar o carro por ID com SUCESSO', async function () {
    const id = '6348513f34c397abcad040b2';
    const out: Car = new Car({
      ...resultMockCars[0],
    });

    sinon.stub(Model, 'find').resolves([resultMockCars[0]]);

    const service = new CarsService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal([out]);    
  });

  it('Deveria deletar o carro por ID com SUCESSO', async function () {
    const id = '6348513f34c397abcad040b2';
    const out: Car = new Car({
      ...resultMockCars[0],
    });

    sinon.stub(Model, 'findByIdAndDelete').resolves(resultMockCars[0]);

    const service = new CarsService();
    const result = await service.delete(id);

    expect(result).to.be.deep.equal(out);    
  });
});