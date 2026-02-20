import { PrismaClient, AgeRange, GenderPresentation, OrderStatus, OrderType, UserRole } from "@prisma/client";
import crypto from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

const sharedImages = [
  "https://picsum.photos/seed/actorstock-1/1200/1600",
  "https://picsum.photos/seed/actorstock-2/1200/1600",
  "https://picsum.photos/seed/actorstock-3/1200/1600",
  "https://picsum.photos/seed/actorstock-4/1200/1600",
  "https://picsum.photos/seed/actorstock-5/1200/1600",
  "https://picsum.photos/seed/actorstock-6/1200/1600"
];

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@actorstock.ai";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "admin1234";

  await prisma.order.deleteMany();
  await prisma.actorView.deleteMany();
  await prisma.actor.deleteMany();
  await prisma.licensePlan.deleteMany();
  await prisma.user.deleteMany();

  const [adminUser, demoUser] = await Promise.all([
    prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashPassword(adminPassword),
        role: UserRole.ADMIN
      }
    }),
    prisma.user.create({
      data: {
        email: "demo@actorstock.ai",
        passwordHash: hashPassword("demo1234"),
        role: UserRole.USER
      }
    })
  ]);

  const plans = await Promise.all([
    prisma.licensePlan.create({
      data: {
        name: "Starter",
        priceMonthly: 4900,
        includedActorsCount: 2,
        includedVoiceMinutes: 60,
        termsUrl: "/terms/starter"
      }
    }),
    prisma.licensePlan.create({
      data: {
        name: "Pro",
        priceMonthly: 14900,
        includedActorsCount: 10,
        includedVoiceMinutes: 300,
        termsUrl: "/terms/pro"
      }
    }),
    prisma.licensePlan.create({
      data: {
        name: "Enterprise",
        priceMonthly: null,
        priceOneTime: 59900,
        includedActorsCount: null,
        includedVoiceMinutes: null,
        termsUrl: "/terms/enterprise"
      }
    })
  ]);

  const actorsData = [
    {
      name: "Ema Voss",
      ageRange: AgeRange.AGE_26_35,
      genderPresentation: GenderPresentation.FEMALE,
      styleTags: ["commercial", "beauty", "lifestyle"],
      vibeTags: ["warm", "trustworthy", "premium"],
      emotionTags: ["friendly", "confident", "calm"],
      languages: ["sk", "cs", "en"],
      bioShort: "Natural lifestyle performer for premium product and ecommerce storytelling.",
      imageUrls: [sharedImages[0], sharedImages[1]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
    },
    {
      name: "Noah Rietz",
      ageRange: AgeRange.AGE_18_25,
      genderPresentation: GenderPresentation.MALE,
      styleTags: ["street", "fashion", "sports"],
      vibeTags: ["energetic", "bold", "youthful"],
      emotionTags: ["excited", "playful", "focused"],
      languages: ["en", "de"],
      bioShort: "Dynamic Gen-Z face for launch campaigns and high tempo social assets.",
      imageUrls: [sharedImages[2], sharedImages[3]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
    },
    {
      name: "Tobias Mlynar",
      ageRange: AgeRange.AGE_36_45,
      genderPresentation: GenderPresentation.MALE,
      styleTags: ["corporate", "finance", "tech"],
      vibeTags: ["authoritative", "clean", "modern"],
      emotionTags: ["serious", "reassuring", "focused"],
      languages: ["sk", "en", "de"],
      bioShort: "Boardroom-ready AI actor for fintech explainers and B2B demos.",
      imageUrls: [sharedImages[4], sharedImages[5]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"
    },
    {
      name: "Zora Kim",
      ageRange: AgeRange.AGE_26_35,
      genderPresentation: GenderPresentation.ANDROGYNOUS,
      styleTags: ["minimal", "editorial", "tech"],
      vibeTags: ["future", "cool", "composed"],
      emotionTags: ["neutral", "curious", "calm"],
      languages: ["en", "de", "cs"],
      bioShort: "Editorial visual identity actor for modern SaaS and product narratives.",
      imageUrls: [sharedImages[1], sharedImages[3]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
    },
    {
      name: "Lea Novak",
      ageRange: AgeRange.AGE_46_60,
      genderPresentation: GenderPresentation.FEMALE,
      styleTags: ["healthcare", "education", "family"],
      vibeTags: ["empathetic", "safe", "authentic"],
      emotionTags: ["supportive", "gentle", "optimistic"],
      languages: ["sk", "cs", "en"],
      bioShort: "Empathetic and trusted presence for healthcare and educational storytelling.",
      imageUrls: [sharedImages[0], sharedImages[4]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
    },
    {
      name: "Milo Reyes",
      ageRange: AgeRange.AGE_18_25,
      genderPresentation: GenderPresentation.MALE,
      styleTags: ["gaming", "stream", "social"],
      vibeTags: ["hype", "fun", "relatable"],
      emotionTags: ["excited", "amused", "confident"],
      languages: ["en", "cs"],
      bioShort: "Fast talking host for creator economy, gaming, and entertainment brands.",
      imageUrls: [sharedImages[2], sharedImages[5]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      videoSampleUrl: null
    },
    {
      name: "Hana Varga",
      ageRange: AgeRange.AGE_36_45,
      genderPresentation: GenderPresentation.FEMALE,
      styleTags: ["luxury", "beauty", "editorial"],
      vibeTags: ["elegant", "sophisticated", "calm"],
      emotionTags: ["confident", "serene", "friendly"],
      languages: ["sk", "en"],
      bioShort: "Luxury-focused actor for premium beauty, wellness, and fashion films.",
      imageUrls: [sharedImages[3], sharedImages[4]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
    },
    {
      name: "Gregor Hale",
      ageRange: AgeRange.AGE_60_PLUS,
      genderPresentation: GenderPresentation.MALE,
      styleTags: ["documentary", "narrative", "education"],
      vibeTags: ["wise", "measured", "reliable"],
      emotionTags: ["calm", "reflective", "steady"],
      languages: ["en", "de"],
      bioShort: "Mature narrative voice and face for documentary style campaigns.",
      imageUrls: [sharedImages[1], sharedImages[5]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"
    },
    {
      name: "Aneta Kral",
      ageRange: AgeRange.AGE_26_35,
      genderPresentation: GenderPresentation.FEMALE,
      styleTags: ["startup", "tech", "saas"],
      vibeTags: ["sharp", "smart", "friendly"],
      emotionTags: ["enthusiastic", "focused", "confident"],
      languages: ["sk", "en", "de"],
      bioShort: "Startup spokesperson for product tours, demos, and onboarding content.",
      imageUrls: [sharedImages[0], sharedImages[2]],
      voiceSampleUrl: null,
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
    },
    {
      name: "Yun Seo",
      ageRange: AgeRange.AGE_18_25,
      genderPresentation: GenderPresentation.ANDROGYNOUS,
      styleTags: ["music", "fashion", "avant-garde"],
      vibeTags: ["edgy", "playful", "fresh"],
      emotionTags: ["joyful", "dramatic", "cool"],
      languages: ["en", "de"],
      bioShort: "Trend-first actor for music visuals and social-first fashion launches.",
      imageUrls: [sharedImages[2], sharedImages[4]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      videoSampleUrl: null
    },
    {
      name: "Marta Bilek",
      ageRange: AgeRange.AGE_46_60,
      genderPresentation: GenderPresentation.FEMALE,
      styleTags: ["retail", "family", "hospitality"],
      vibeTags: ["welcoming", "practical", "grounded"],
      emotionTags: ["happy", "reassuring", "warm"],
      languages: ["sk", "cs"],
      bioShort: "Approachable commercial actor for retail and service communication.",
      imageUrls: [sharedImages[3], sharedImages[5]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
    },
    {
      name: "Rico Alvarez",
      ageRange: AgeRange.AGE_26_35,
      genderPresentation: GenderPresentation.MALE,
      styleTags: ["automotive", "sports", "adventure"],
      vibeTags: ["bold", "dynamic", "confident"],
      emotionTags: ["intense", "focused", "motivated"],
      languages: ["en", "de", "cs"],
      bioShort: "High-energy campaign performer for automotive and adventure brands.",
      imageUrls: [sharedImages[1], sharedImages[4]],
      voiceSampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      videoSampleUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
    }
  ];

  const createdActors = await Promise.all(
    actorsData.map((actor, index) =>
      prisma.actor.create({
        data: {
          ...actor,
          isPublished: true,
          viewCount: 40 - index * 2
        }
      })
    )
  );

  for (const actor of createdActors) {
    const viewRows = Math.max(2, Math.floor(actor.viewCount / 6));
    for (let i = 0; i < viewRows; i += 1) {
      await prisma.actorView.create({
        data: {
          actorId: actor.id,
          userId: i % 2 === 0 ? demoUser.id : null,
          ipAddress: `127.0.0.${(i % 200) + 1}`
        }
      });
    }
  }

  await prisma.order.createMany({
    data: [
      {
        userId: demoUser.id,
        actorId: createdActors[0].id,
        planId: plans[0].id,
        type: OrderType.SUBSCRIPTION,
        status: OrderStatus.ACTIVE,
        companyName: "PixelForge Studio",
        notes: "Starter package for social campaigns"
      },
      {
        userId: demoUser.id,
        actorId: createdActors[2].id,
        planId: plans[1].id,
        type: OrderType.PAY_PER_USE,
        status: OrderStatus.PAID,
        companyName: "Launchlane Labs",
        notes: "One-time campaign buyout"
      },
      {
        userId: adminUser.id,
        actorId: createdActors[4].id,
        planId: null,
        type: OrderType.REQUEST,
        status: OrderStatus.PENDING,
        companyName: "Visionary Brands",
        notes: "Need custom usage rights for CEE market"
      }
    ]
  });

  console.log("Seed completed.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  console.log("Demo login: demo@actorstock.ai / demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
