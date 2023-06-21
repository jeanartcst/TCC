import { prisma } from "../../prisma";

import { UserRepository, UserData } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async create({
    cnpj_cpf,
    email,
    password,
    last_name,
    name,
    address_id,
    contact_information_id,
  }: UserData) {
    await prisma.user.create({
      data: {
        cnpj_cpf,
        email,
        password,
        last_name,
        name,
        address_id,
        contact_information_id,
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
