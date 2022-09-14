/*
  Warnings:

  - Made the column `order` on table `SetGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SetGroup" ALTER COLUMN "order" SET NOT NULL;
