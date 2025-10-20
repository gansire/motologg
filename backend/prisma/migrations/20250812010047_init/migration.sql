-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."History" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odometer" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION,
    "subtitle" TEXT,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "public"."Vehicle"("plate");

-- AddForeignKey
ALTER TABLE "public"."History" ADD CONSTRAINT "History_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
