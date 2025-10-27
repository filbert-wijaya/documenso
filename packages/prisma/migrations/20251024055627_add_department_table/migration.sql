-- CreateTable
CREATE TABLE "core_hr_sch"."Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "core_hr_sch"."Department"("name");

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "core_hr_sch"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
