-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "street_avenue" DROP NOT NULL,
ALTER COLUMN "house_number" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "neighbor_name" DROP NOT NULL;
