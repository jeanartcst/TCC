/*
  Warnings:

  - You are about to drop the column `studentInformationId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_studentInformationId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "studentInformationId";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "StudentInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
