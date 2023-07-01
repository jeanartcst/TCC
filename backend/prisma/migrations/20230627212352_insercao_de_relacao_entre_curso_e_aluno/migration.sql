-- AddForeignKey
ALTER TABLE "StudentInformation" ADD CONSTRAINT "StudentInformation_current_course_fkey" FOREIGN KEY ("current_course") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
