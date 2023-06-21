-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnpj_cpf" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cnpj_cpf_key" ON "users"("cnpj_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_information_id_key" ON "users"("contact_information_id");
