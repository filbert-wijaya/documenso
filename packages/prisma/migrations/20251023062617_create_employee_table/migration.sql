-- CreateTable
CREATE TABLE "core_hr_sch"."Employee" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "employee_no" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_id_key" ON "core_hr_sch"."Employee"("user_id");

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_hr_sch"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
