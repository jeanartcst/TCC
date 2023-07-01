import express from "express";
import { z } from "zod";

import { PrismaUserRepository } from "./repositories/prisma/prisma-user-repository";
import { SubmitUserUseCase } from "./use-cases/submit-user-use-case";

export const routes = express.Router();

const cpfCnpjValidator = z
  .string()
  .refine((value) => {
    const cleanedCpfCnpj = value.replace(/\D/g, "");
    if (cleanedCpfCnpj.length !== 11 && cleanedCpfCnpj.length !== 14) {
      return false;
    }
    if (/^(\d)\1+$/.test(cleanedCpfCnpj)) {
      return false;
    }
    return true;
  })
  .transform((value) => value.replace(/\D/g, ""));

const createUserSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  cnpj_cpf: cpfCnpjValidator,
  email: z.string().email(),
  password: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  complement: z.string().nullable(),
  house_number: z.string().nullable(),
  neighbor_name: z.string().nullable(),
  street_avenue: z.string().nullable(),
  zip_code: z.number().min(11111111).max(99999999),
  phone_number: z.string(),
  current_course: z.string(),
  enrollment_data: z.date(),
});

routes.post("/users/create", async (req, res) => {
  try {
    const prismaUserRepository = new PrismaUserRepository();
    const submitUserUseCase = new SubmitUserUseCase(prismaUserRepository);
    const {
      name,
      last_name,
      email,
      password,
      cnpj_cpf,
      city,
      country,
      complement,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      zip_code,
      current_course,
      enrollment_data,
      phone_number,
    } = createUserSchema.parse(req.body);

    console.log(req.body);

    await submitUserUseCase.execute({
      name,
      last_name,
      email,
      cnpj_cpf,
      password,
      city,
      country,
      complement,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      zip_code,
      current_course,
      enrollment_data,
      phone_number,
    });

    return res.status(201).send();
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).send("Invalid user data");
  }
});

routes.delete("/users/delete/:id", async (req, res) => {
  const prismaUserRepository = new PrismaUserRepository();

  const submitUserUseCase = new SubmitUserUseCase(prismaUserRepository);

  const { id } = req.params;

  await submitUserUseCase.deleteUser(Number(id));

  return res.status(200).send();
});

routes.get("/users/:id", async (req, res) => {
  const prismaUserRepository = new PrismaUserRepository();
  const { id } = req.params;

  const data = await prismaUserRepository.read(Number(id));

  return res.json(data);
});

routes.put("/users/:id", async (req, res) => {
  const prismaUserRepository = new PrismaUserRepository();

  const submitUserUseCase = new SubmitUserUseCase(prismaUserRepository);

  const { id } = req.params;

  const {
    name,
    last_name,
    email,
    password,
    cnpj_cpf,
    city,
    complement,
    country,
    house_number,
    neighbor_name,
    state,
    street_avenue,
    zip_code,
    current_course,
    enrollment_data,
    phone_number,
  } = createUserSchema.parse(req.body);

  await submitUserUseCase.updateUser(Number(id), {
    name,
    last_name,
    email,
    cnpj_cpf,
    city,
    complement,
    country,
    house_number,
    neighbor_name,
    state,
    street_avenue,
    zip_code,
    password,
    current_course,
    enrollment_data,
    phone_number,
  });

  return res.status(200).send();
});
