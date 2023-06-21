import { PrismaUserRepository } from "./repositories/prisma/prisma-user-repository";
import express from "express";
import { SubmitUserUseCase } from "./use-cases/submit-user-use-case";

export const routes = express.Router();

routes.post(
  "/users/create",
  async (req, res) => {
    const {
      name,
      last_name,
      email,
      contact_information_id,
      address_id,
      password,
      cnpj_cpf,
    } = req.body;

    const prismaUserRepository = new PrismaUserRepository();

    const submitUserUseCase = new SubmitUserUseCase(prismaUserRepository);

    await submitUserUseCase.execute({
      name,
      last_name,
      email,
      cnpj_cpf,
      contact_information_id,
      address_id,
      password,
    });

    return res.status(201).send();
  },

  routes.delete("/users/delete/:id", async (req, res) => {
    const { id } = req.params;

    const prismaUserRepository = new PrismaUserRepository();

    const submitUserUseCase = new SubmitUserUseCase(prismaUserRepository);

    await prismaUserRepository.delete(Number(id));

    return res.status(200).send();
  })
);
