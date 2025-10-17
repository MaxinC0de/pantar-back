-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "actors" TEXT NOT NULL,
    "poster" TEXT,
    "posterWide" TEXT,
    "ratings" JSONB NOT NULL,
    "metascore" TEXT NOT NULL,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Watchlist" (
    "id" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "public"."Movie"("title");
