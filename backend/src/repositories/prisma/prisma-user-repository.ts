import { prisma } from "../../prisma";

import { UserRepository, UserData } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async create({
    cnpj_cpf,
    email,
    password,
    last_name,
    name,
    city,
    state,
    country,
    complement,
    current_course,
    enrollment_data,
    house_number,
    neighbor_name,
    phone_number,
    street_avenue,
    zip_code,
  }: UserData) {
    // await prisma.contactData

    if (current_course == undefined) {
      current_course = "Formado";
    }

    await prisma.user.create({
      data: {
        name,
        last_name,
        email,
        cnpj_cpf,
        password,
        address: {
          create: {
            city,
            state,
            country,
            complement,
            zip_code,
            street_avenue,
            neighbor_name,
            house_number,
          },
        },
        contact: { create: { phone: phone_number } },
        StudentInformation: {
          create: {
            enrollment_data,
            course: {
              create: {
                course_name: current_course,
              },
            },
          },
        },
      },
    });
  }

  async read(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
        contact: { select: { phone: true } },
        StudentInformation: {
          include: { course: { select: { course_name: true } } },
        },
      },
    });

    if (!user) {
      throw new Error("User not found, try again ");
    }

    const transformedUser = {
      name: user.name,
      last_name: user.last_name,
      cnpj_cpf: user.name,
      email: user.email,
      password: user.password,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      complement: user.address.complement,
      house_number: user.address.house_number,
      neighbor_name: user.address.neighbor_name,
      street_avenue: user.address.street_avenue,
      zip_code: user.address.zip_code,
      phone_number: user.contact.phone,
      current_course: user.StudentInformation?.course.course_name,
      enrollment_data: user.StudentInformation?.enrollment_data,
    };

    if (!transformedUser) {
      throw new Error("User not found, try again ");
    }

    if (transformedUser.enrollment_data == undefined) {
      transformedUser.enrollment_data = new Date();
    }

    console.log(transformedUser);

    return transformedUser;
  }

  async update(
    id: number,
    { cnpj_cpf, email, password, last_name, name }: UserData
  ) {
    await prisma.user.update({
      where: { id },
      data: {
        cnpj_cpf,
        email,
        password,
        last_name,
        name,
      },
    });
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
