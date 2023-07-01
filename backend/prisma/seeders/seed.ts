import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.courses.createMany({
    data: [
      {
        course_name: "Engenharia de Software",
      },
      { course_name: "Engenharia de Computação" },
      { course_name: "Engenharia Mecânica" },
      {
        course_name: "Enfermagem",
      },
      { course_name: "Medicina" },
      { course_name: "Educação Física" },
    ],
  });

  const joao = await prisma.user.upsert({
    where: { email: "joao.pedro@gmail.com" },
    update: {},
    create: {
      name: "João",
      last_name: "Pedro da Silva",
      cnpj_cpf: "68222489003",
      email: "joao.pedro@gmail.com",
      password: "1q2w3e4r5",
      address: {
        create: {
          city: "Belo Horizonte",
          complement: "",
          country: "Brasil",
          house_number: "12",
          neighbor_name: "Savassi",
          state: "Minas Gerais",
          street_avenue: "Travessa Alameda",
          zip_code: 30140190,
        },
      },
      StudentInformation: {
        create: {
          current_course: 2,
          enrollment_data: new Date("2019-05-03 11:43:55.999"),
        },
      },
      contact: { create: { phone: 5531985641515 } },
    },
  });

  const larissa = await prisma.user.upsert({
    where: { email: "moon_larissa@outlook.com" },
    update: {},
    create: {
      name: "Larissa",
      last_name: " de Lua Alves",
      cnpj_cpf: "79586528014",
      email: "",
      password: "zsxasdqwe",
      address: {
        create: {
          city: "Goiânia",
          complement: "Fundos",
          country: "Brasil",
          house_number: "1385",
          neighbor_name: "Setor Central",
          state: "Goias",
          street_avenue: "lado impar",
          zip_code: 35901989,
        },
      },
      StudentInformation: {
        create: {
          current_course: 4,
          enrollment_data: new Date("2018-12-25 23:50:55.999"),
        },
      },
      contact: { create: { phone: 5531985641123 } },
    },
  });

  console.log({ joao, larissa });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
