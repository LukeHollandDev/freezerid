-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_itemsTotags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_itemsTotags_AB_unique" ON "_itemsTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_itemsTotags_B_index" ON "_itemsTotags"("B");

-- AddForeignKey
ALTER TABLE "_itemsTotags" ADD CONSTRAINT "_itemsTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itemsTotags" ADD CONSTRAINT "_itemsTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
