/*
  Warnings:

  - You are about to drop the column `name` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placa]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ano` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kmInicial` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Vehicle_plate_key";

-- AlterTable
ALTER TABLE "public"."Vehicle" DROP COLUMN "name",
DROP COLUMN "plate",
ADD COLUMN     "ano" INTEGER NOT NULL,
ADD COLUMN     "kmInicial" INTEGER NOT NULL,
ADD COLUMN     "modelo" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "placa" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_placa_key" ON "public"."Vehicle"("placa");

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
