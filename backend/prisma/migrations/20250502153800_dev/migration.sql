/*
  Warnings:

  - You are about to drop the column `age` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fitnessLevel` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "age",
DROP COLUMN "fitnessLevel",
DROP COLUMN "gender",
DROP COLUMN "imageUrl",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
