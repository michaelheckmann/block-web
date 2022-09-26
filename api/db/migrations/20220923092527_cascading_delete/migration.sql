-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_setGroupId_fkey";

-- DropForeignKey
ALTER TABLE "SetGroup" DROP CONSTRAINT "SetGroup_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "SetGroup" ADD CONSTRAINT "SetGroup_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_setGroupId_fkey" FOREIGN KEY ("setGroupId") REFERENCES "SetGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
