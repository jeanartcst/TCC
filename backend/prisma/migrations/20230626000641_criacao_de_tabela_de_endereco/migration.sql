-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street_avenue" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighbor_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
