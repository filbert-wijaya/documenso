/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "document_hr_sch"."User" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "document_hr_sch"."User"("user_id");

-- AddForeignKey
ALTER TABLE "document_hr_sch"."User" ADD CONSTRAINT "User_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_hr_sch"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
