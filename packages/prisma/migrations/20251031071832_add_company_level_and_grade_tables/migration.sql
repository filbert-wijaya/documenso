/*
  Warnings:

  - Added the required column `company_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_id` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "core_hr_sch"."Employee" ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD COLUMN     "grade_id" INTEGER NOT NULL,
ADD COLUMN     "level_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "core_hr_sch"."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core_hr_sch"."Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core_hr_sch"."Grade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "core_hr_sch"."Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "core_hr_sch"."Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_name_key" ON "core_hr_sch"."Grade"("name");

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "core_hr_sch"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "core_hr_sch"."Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "core_hr_sch"."Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "core_hr_sch"."Core_user_email_key" RENAME TO "User_email_key";
