-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "Adress" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boardgame" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "kategory" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boardgame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardgamesForUsers" (
    "userId" INTEGER NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardgamesForUsers_pkey" PRIMARY KEY ("userId","boardgameId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nickName" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_nickName_key" ON "Admin"("nickName");

-- AddForeignKey
ALTER TABLE "BoardgamesForUsers" ADD CONSTRAINT "BoardgamesForUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgamesForUsers" ADD CONSTRAINT "BoardgamesForUsers_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "Boardgame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
