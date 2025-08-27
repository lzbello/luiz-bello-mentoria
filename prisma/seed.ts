import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function formatarData(date: Date) {
  return format(date, "EEE dd MMM", { locale: ptBR }).toLowerCase();
}

async function main() {
  // Criptografa a senha "senha123"
  const senhaHash = await bcrypt.hash("senha123", 10);

  // Criar usuários fixos para representar ingressos Masculino e Feminino
  const [userMasculino, userFeminino] = await Promise.all([
    prisma.user.upsert({
      where: { email: "masculino@seed.com" },
      update: {},
      create: {
        name: "Masculino",
        email: "masculino@seed.com",
        password: senhaHash,
      },
    }),
    prisma.user.upsert({
      where: { email: "feminino@seed.com" },
      update: {},
      create: {
        name: "Feminino",
        email: "feminino@seed.com",
        password: senhaHash,
      },
    }),
  ]);

  const events = [
    {
      title: "Quinta do Pagode com S3",
      slug: "quinta-do-pagode-com-s3",
      venue: "Une Bauru",
      date: new Date("2025-08-17T21:00:00Z"),
      image:
        "https://d106p58duwuiz5.cloudfront.net/event/cover/ef99f244f137d61d0b344b50fe1e59b3.jpg",
      category: "QUINTA",
    },
    {
      title: "Grupo Vibe convida Pagode do Sidão",
      slug: "grupo-vibe-convida-pagode-do-sidao",
      venue: "Une Bar",
      date: new Date("2025-08-19T23:00:00Z"),
      image:
        "https://d106p58duwuiz5.cloudfront.net/event/cover/14ec35aac910b020f3307a686e4ceca3.png",
      category: "LIVE",
    },
    {
      title: "LILI Club || Sexta 18.07 || MC GW",
      slug: "lili-club-sexta-18-07-mc-gw",
      venue: "Lili Club",
      date: new Date("2025-08-18T22:00:00Z"),
      image:
        "https://d106p58duwuiz5.cloudfront.net/event/cover/5966952d4662614beb5446d3f97c7a00.jpg",
      category: "FESTA",
    },
  ];

  for (const eventData of events) {
    let event = await prisma.event.findUnique({
      where: { slug: eventData.slug },
    });

    if (!event) {
      event = await prisma.event.create({ data: eventData });
      console.log(
        `Evento criado: ${event.title} - ${formatarData(event.date)}`
      );
    } else {
      console.log(
        `Evento já existe: ${event.title} - ${formatarData(event.date)}`
      );
    }

    // Tickets Masculino
    const ticketMasculinoExists = await prisma.ticket.findFirst({
      where: { userId: userMasculino.id, eventId: event.id },
    });

    if (!ticketMasculinoExists) {
      await prisma.ticket.create({
        data: {
          userId: userMasculino.id,
          eventId: event.id,
          price: 50.0,
          status: "PENDING",
        },
      });
    }

    // Tickets Feminino
    const ticketFemininoExists = await prisma.ticket.findFirst({
      where: { userId: userFeminino.id, eventId: event.id },
    });

    if (!ticketFemininoExists) {
      await prisma.ticket.create({
        data: {
          userId: userFeminino.id,
          eventId: event.id,
          price: 40.0,
          status: "PENDING",
        },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
