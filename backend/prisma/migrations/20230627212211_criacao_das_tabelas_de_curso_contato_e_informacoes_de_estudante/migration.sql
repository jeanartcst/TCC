-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "phone" INTEGER NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentInformation" (
    "id" SERIAL NOT NULL,
    "current_course" INTEGER NOT NULL,
    "enrollment_data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
