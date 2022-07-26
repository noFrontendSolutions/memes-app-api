-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "confirmed" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "meme_url" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "dislikes" INTEGER DEFAULT 0,

    CONSTRAINT "memes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meme_stats" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "meme_id" INTEGER NOT NULL,
    "is_lover" SMALLINT DEFAULT 0,
    "is_hater" SMALLINT DEFAULT 0,
    "made_comment" SMALLINT DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "meme_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "meme_id" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meme_stats" ADD CONSTRAINT "meme_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meme_stats" ADD CONSTRAINT "meme_stats_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_meme_id_fkey" FOREIGN KEY ("meme_id") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
