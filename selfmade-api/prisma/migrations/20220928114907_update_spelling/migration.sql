/*
  Warnings:

  - You are about to drop the column `kategory` on the `Boardgame` table. All the data in the column will be lost.
  - Added the required column `category` to the `Boardgame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boardgame" DROP COLUMN "kategory",
ADD COLUMN     "category" TEXT NOT NULL;
