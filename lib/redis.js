import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Car extends Entity {}

let schema = new Schema(
  Car,
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string', textSearch: true },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createCar(data) {
  await connect();
  const respository = client.fetchRepository(schema);
  const car = respository.createEntity(data);
  const id = await respository.save(car);
  return id;
}

export async function createIndex() {
  await connect();
  const repository = client.fetchRepository(schema);
  await repository.createIndex();
}

export async function searchCars(q) {
  await connect();
  const respository = client.fetchRepository(schema);
  const cars = await respository
    .search()
    .where('make')
    .eq(q)
    .or('model')
    .eq(q)
    .or('description')
    .matches(q)
    .return.all();

  return cars;
}
