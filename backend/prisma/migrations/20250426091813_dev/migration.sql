/*
  Warnings:

  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `day` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date",
ADD COLUMN     "day" "Day" NOT NULL,
ALTER COLUMN "profileId" DROP NOT NULL;
