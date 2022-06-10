import { getAllCars } from '../../lib/redis';

export default async function handler(req, res) {
  const cars = await getAllCars;
  res.status(200).json({ cars });
}
