import { Hono } from "hono";
import { dataCars } from "./data/cars";
import { prisma } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Wellcome to Cars-API" });
});

app.post("/cars/seed", async (c) => {
  const cars = await prisma.car.createMany({
    data: dataCars,
  });
  return c.json(cars);
});

app.get("/cars", async (c) => {
  const cars = await prisma.car.findMany();
  return c.json(cars);
});

app.get("/cars/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    c.status(404);
    return c.json({ message: "car not found" });
  }

  return c.json(car);
});

app.post("/cars", async (c) => {
  const body = await c.req.json();

  const carData = {
    name: String(body.name),
    bodyModel: String(body.bodyModel),
    engineCylinderConfiguration: String(body.engineCylinderConfiguration)
      ? null
      : null,
    numberOfDoors: Number(body.numberOfDoors),
    seatingCapacity: Number(body.seatingCapacity),
    fuelTankCapacity: String(body.fuelTankCapacity),
    wheelDriveSystem: Array.isArray(body.wheelDriveSystem)
      ? body.wheelDriveSystem.map(String)
      : [],
    machine: Array.isArray(body.machine) ? body.machine.map(String) : [],
  };

  const car = await prisma.car.create({
    data: carData,
  });

  return c.json({ car });
});

app.delete("/cars", async (c) => {
  const result = await prisma.car.deleteMany();

  return c.json({
    message: "All cars data have been removed",
    result,
  });
});

app.delete("/cars/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const deletedCar = await prisma.car.delete({
    where: { id },
  });

  return c.json({
    message: `Deleted car with id ${id}`,
    deletedCar,
  });
});

app.put("/cars/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const carData = {
    name: String(body.name),
    bodyModel: String(body.bodyModel),
    engineCylinderConfiguration: String(body.engineCylinderConfiguration),
    numberOfDoors: Number(body.numberOfDoors),
    seatingCapacity: Number(body.seatingCapacity),
    fuelTankCapacity: String(body.fuelTankCapacity),
    wheelDriveSystem: Array.isArray(body.wheelDriveSystem)
      ? body.wheelDriveSystem.map(String)
      : [],
    machine: Array.isArray(body.machine) ? body.machine.map(String) : [],
  };

  const updatedCar = await prisma.car.update({
    where: { id },
    data: carData,
  });

  return c.json({
    message: `Updated car with id ${id}`,
    updatedCar,
  });
});

export default app;

console.log(`Car API is running on`);
