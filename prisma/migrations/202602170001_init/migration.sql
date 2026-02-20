-- CreateEnum
CREATE TYPE "AgeRange" AS ENUM ('AGE_18_25', 'AGE_26_35', 'AGE_36_45', 'AGE_46_60', 'AGE_60_PLUS');

-- CreateEnum
CREATE TYPE "GenderPresentation" AS ENUM ('MALE', 'FEMALE', 'ANDROGYNOUS', 'OTHER');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('SUBSCRIPTION', 'PAY_PER_USE', 'REQUEST');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ageRange" "AgeRange" NOT NULL,
    "genderPresentation" "GenderPresentation" NOT NULL DEFAULT 'OTHER',
    "styleTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "vibeTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "emotionTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bioShort" TEXT NOT NULL,
    "imageUrls" TEXT[] NOT NULL,
    "voiceSampleUrl" TEXT,
    "videoSampleUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicensePlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceMonthly" INTEGER,
    "priceOneTime" INTEGER,
    "includedActorsCount" INTEGER,
    "includedVoiceMinutes" INTEGER,
    "termsUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicensePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actorId" TEXT,
    "planId" TEXT,
    "type" "OrderType" NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "stripeSessionId" TEXT,
    "companyName" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActorView" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActorView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Actor_isPublished_createdAt_idx" ON "Actor"("isPublished", "createdAt");

-- CreateIndex
CREATE INDEX "Actor_viewCount_idx" ON "Actor"("viewCount");

-- CreateIndex
CREATE UNIQUE INDEX "LicensePlan_name_key" ON "LicensePlan"("name");

-- CreateIndex
CREATE INDEX "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Order_actorId_idx" ON "Order"("actorId");

-- CreateIndex
CREATE INDEX "Order_planId_idx" ON "Order"("planId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "ActorView_actorId_createdAt_idx" ON "ActorView"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "ActorView_userId_idx" ON "ActorView"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_planId_fkey" FOREIGN KEY ("planId") REFERENCES "LicensePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorView" ADD CONSTRAINT "ActorView_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorView" ADD CONSTRAINT "ActorView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
