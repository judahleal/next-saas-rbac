/*
  Warnings:

  - You are about to drop the column `provier_account_id` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "accounts_provier_account_id_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "provier_account_id",
ADD COLUMN     "provider_account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");
