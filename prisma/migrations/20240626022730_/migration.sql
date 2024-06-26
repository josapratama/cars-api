-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bodyModel" TEXT,
    "engineCylinderConfiguration" TEXT,
    "numberOfDoors" INTEGER,
    "seatingCapacity" INTEGER,
    "fuelTankCapacity" TEXT,
    "wheelDriveSystem" TEXT[],
    "machine" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brandId" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "founder" VARCHAR(255),
    "headQuarters" VARCHAR(255),
    "established" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(255),
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
