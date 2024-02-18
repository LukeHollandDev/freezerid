-- CreateTable
CREATE TABLE "Shared" (
    "id" SERIAL NOT NULL,
    "sharer_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,

    CONSTRAINT "Shared_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shared" ADD CONSTRAINT "Shared_sharer_id_fkey" FOREIGN KEY ("sharer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
