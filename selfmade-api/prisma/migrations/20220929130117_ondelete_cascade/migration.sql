-- DropForeignKey
ALTER TABLE "BoardgamesForUsers" DROP CONSTRAINT "BoardgamesForUsers_boardgameId_fkey";

-- DropForeignKey
ALTER TABLE "BoardgamesForUsers" DROP CONSTRAINT "BoardgamesForUsers_userId_fkey";

-- AddForeignKey
ALTER TABLE "BoardgamesForUsers" ADD CONSTRAINT "BoardgamesForUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgamesForUsers" ADD CONSTRAINT "BoardgamesForUsers_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "Boardgame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
