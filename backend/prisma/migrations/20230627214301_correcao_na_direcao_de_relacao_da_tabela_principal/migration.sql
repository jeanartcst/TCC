/*
  Warnings:

  - You are about to drop the column `user_id` on the `contacts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_user_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
