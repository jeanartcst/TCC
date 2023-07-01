/*
  Warnings:

  - Made the column `student_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_student_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "student_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "StudentInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
