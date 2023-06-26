import { prisma } from "../../prisma";
import { AddressData, AddressRepository } from "./../address-repository";

export class PrismaAddressRepository implements AddressRepository {
  async create({
    city,
    country,
    complement,
    house_number,
    neighbor_name,
    state,
    street_avenue,
    zip_code,
  }: AddressData) {
    const { id } = await prisma.address.create({
      data: {
        city,
        country,
        complement,
        house_number,
        neighbor_name,
        state,
        street_avenue,
        zip_code,
      },
    });

    if (!id) {
      throw new Error("Could not create address");
    }

    return id;
  }

  async read(id: number) {
    const addressData = await prisma.address.findUnique({ where: { id } });

    if (!addressData) {
      throw new Error("User not found");
    }

    return addressData;
  }

  async update(
    id: number,
    {
      city,
      country,
      complement,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      zip_code,
    }: AddressData
  ) {
    await prisma.address.update({
      where: { id },
      data: {
        city,
        complement,
        country,
        house_number,
        neighbor_name,
        state,
        street_avenue,
        zip_code,
      },
    });
  }

  async delete(id: number) {
    await prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
