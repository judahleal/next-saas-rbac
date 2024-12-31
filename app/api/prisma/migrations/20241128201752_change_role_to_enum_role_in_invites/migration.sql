/*
  Warnings:

  - Changed the type of `role` on the `invites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invites" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
