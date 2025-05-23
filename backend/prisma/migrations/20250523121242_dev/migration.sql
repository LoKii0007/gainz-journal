-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LBS');

-- CreateEnum
CREATE TYPE "WeightType" AS ENUM ('TOTAL', 'PER_SIDE');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "weightType" "WeightType" NOT NULL DEFAULT 'PER_SIDE',
ADD COLUMN     "weightUnit" "WeightUnit" NOT NULL DEFAULT 'KG';

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "unit" "WeightUnit" NOT NULL DEFAULT 'KG',
ADD COLUMN     "weightType" "WeightType" NOT NULL DEFAULT 'PER_SIDE';
