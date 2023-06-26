import { AddressRepository } from "./../repositories/address-repository";
import { UserRepository } from "../repositories/user-repository";

interface SubmitUserUseCaseRequest {
  name: string;
  address_id: number | null | undefined;
  last_name: string;
  email: string;
  cnpj_cpf: string;
  password: string;
  contact_information_id: number;
  street_avenue: string | null;
  house_number: string | null;
  complement: string | null;
  neighbor_name: string | null;
  city: string;
  state: string;
  zip_code: number;
  country: string;
}

export class SubmitUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private addressRepository: AddressRepository
  ) {}

  async execute(request: SubmitUserUseCaseRequest) {
    const {
      name,
      last_name,
      email,
      cnpj_cpf,
      password,
      contact_information_id,
      city,
      complement,
      neighbor_name,
      country,
      zip_code,
      house_number,
      state,
      street_avenue,
    } = request;

    if (!name && !last_name && !email) {
      throw new Error(
        "Name, e-mail and last name cannot be empty and must be unique!"
      );
    }

    const address_id = await this.addressRepository.create({
      city,
      complement,
      neighbor_name,
      country,
      zip_code,
      house_number,
      state,
      street_avenue,
    });

    console.log(address_id);

    await this.userRepository.create({
      name,
      email,
      last_name,
      cnpj_cpf,
      password,
      address_id,
      contact_information_id,
    });
  }

  async read(id: number) {
    const user = await this.userRepository.read(id);

    if (!user) {
      throw new Error("User not found!");
    }
    const addressData = await this.addressRepository.read(user.address_id);

    return [user, addressData];
  }

  async updateUser(id: number, request: SubmitUserUseCaseRequest) {
    const user = await this.userRepository.read(id);

    if (!user) {
      throw new Error("User not found!");
    }

    const {
      name,
      last_name,
      email,
      cnpj_cpf,
      password,
      contact_information_id,
      city,
      complement,
      country,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      zip_code,
    } = request;

    await this.addressRepository.update(user.address_id, {
      city,
      complement,
      country,
      house_number,
      neighbor_name,
      state,
      street_avenue,
      zip_code,
    });

    await this.userRepository.update(id, {
      address_id: user.address_id,
      cnpj_cpf,
      password,
      contact_information_id,
      email,
      last_name,
      name,
    });
  }

  async deleteUser(id: number) {
    const userData = await this.userRepository.read(id);

    if (!userData) {
      throw new Error(`User not found: ${id}`);
    }
    await this.addressRepository.delete(userData.address_id);
    await this.userRepository.delete(id);
  }
}
