import express from "express";
import { z } from "zod";

import { PrismaUserRepository } from "./repositories/prisma/prisma-user-repository";
import { SubmitUserUseCase } from "./use-cases/submit-user-use-case";
import { PrismaAddressRepository } from "./repositories/prisma/prisma-address-repository";

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
  cnpj_cpf: cpfCnpjValidator,
  email: z.string().email(),
  address_id: z.number().optional().nullable(),
  password: z.string(),
  name: z.string(),
  last_name: z.string(),
  contact_information_id: z.number(),
  city: z.string(),
  country: z.string(),
  complement: z.string().nullable(),
  house_number: z.string().nullable(),
  neighbor_name: z.string().nullable(),
  state: z.string(),
  street_avenue: z.string().nullable(),
  zip_code: z.number().min(11111111).max(99999999),
});

routes.post("/users/create", async (req, res) => {
  try {
    const prismaUserRepository = new PrismaUserRepository();
    const prismaAddressRepository = new PrismaAddressRepository();
    const submitUserUseCase = new SubmitUserUseCase(
      prismaUserRepository,
      prismaAddressRepository
    );
    const {
      name,
      last_name,
      email,
      contact_information_id,
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
      address_id,
    } = createUserSchema.parse(req.body);

    await submitUserUseCase.execute({
      name,
      last_name,
      email,
      cnpj_cpf,
      contact_information_id,
      password,
      city,
      country,
      complement,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      address_id,
      zip_code,
    });

    return res.status(201).send();
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).send("Invalid user data");
  }
});

routes.delete("/users/delete/:id", async (req, res) => {
  const prismaUserRepository = new PrismaUserRepository();
  const prismaAddressRepository = new PrismaAddressRepository();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaUserRepository,
    prismaAddressRepository
  );

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
  const prismaAddressRepository = new PrismaAddressRepository();

  const submitUserUseCase = new SubmitUserUseCase(
    prismaUserRepository,
    prismaAddressRepository
  );

  const { id } = req.params;

  const {
    name,
    last_name,
    email,
    contact_information_id,
    password,
    cnpj_cpf,
    address_id,
    city,
    complement,
    country,
    house_number,
    neighbor_name,
    state,
    street_avenue,
    zip_code,
  } = createUserSchema.parse(req.body);

  await submitUserUseCase.updateUser(Number(id), {
    name,
    last_name,
    email,
    cnpj_cpf,
    contact_information_id,
    address_id,
    city,
    complement,
    country,
    house_number,
    neighbor_name,
    state,
    street_avenue,
    zip_code,
    password,
  });

  return res.status(200).send();
});
