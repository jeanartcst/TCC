-- AlterTable
ALTER TABLE "users" ADD COLUMN     "studentInformationId" INTEGER,
ADD COLUMN     "student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_studentInformationId_fkey" FOREIGN KEY ("studentInformationId") REFERENCES "StudentInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
