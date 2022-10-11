-- AlterTable
ALTER TABLE "Boardgame" ALTER COLUMN "publicationDate" DROP DEFAULT,
ALTER COLUMN "publicationDate" SET DATA TYPE TEXT;
