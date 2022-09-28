-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
