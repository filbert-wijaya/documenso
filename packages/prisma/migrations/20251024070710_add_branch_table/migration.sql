-- CreateTable
CREATE TABLE "core_hr_sch"."Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "core_hr_sch"."Branch"("name");

-- AddForeignKey
ALTER TABLE "core_hr_sch"."Employee" ADD CONSTRAINT "Employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "core_hr_sch"."Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
