import { UserRepository } from "../repositories/user-repository";

interface SubmitUserUseCaseRequest {
  name: string;
  last_name: string;
  cnpj_cpf: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  complement: string | null;
  house_number: string | null;
  neighbor_name: string | null;
  street_avenue: string | null;
  zip_code: number;
  phone_number: string;
  current_course: string;
  enrollment_data: Date;
}

export class SubmitUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: SubmitUserUseCaseRequest) {
    const {
      name,
      last_name,
      email,
      city,
      cnpj_cpf,
      complement,
      country,
      current_course,
      enrollment_data,
      house_number,
      neighbor_name,
      password,
      phone_number,
      state,
      street_avenue,
      zip_code,
    } = request;

    if (!name && !last_name && !email) {
      throw new Error(
        "Name, e-mail and last name cannot be empty and must be unique!"
      );
    }

    await this.userRepository.create({
      name,
      email,
      last_name,
      cnpj_cpf,
      password,
      city,
      complement,
      country,
      enrollment_data,
      house_number,
      neighbor_name,
      phone_number,
      state,
      street_avenue,
      zip_code,
      current_course,
    });
  }

  async read(id: number) {
    const user = await this.userRepository.read(id);

    if (!user) {
      throw new Error("User not found!");
    }
    // const addressData = await this.addressRepository.read(user.address_id);

    return user;
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
      city,
      cnpj_cpf,
      complement,
      country,
      current_course,
      enrollment_data,
      house_number,
      neighbor_name,
      password,
      phone_number,
      state,
      street_avenue,
      zip_code,
    } = request;

    await this.userRepository.update(id, {
      name,
      last_name,
      email,
      city,
      cnpj_cpf,
      complement,
      country,
      current_course,
      enrollment_data,
      house_number,
      neighbor_name,
      password,
      phone_number,
      state,
      street_avenue,
      zip_code,
    });
  }

  async deleteUser(id: number) {
    const userData = await this.userRepository.read(id);

    if (!userData) {
      throw new Error(`User not found: ${id}`);
    }
    // await this.addressRepository.delete(userData.address_id);
    await this.userRepository.delete(id);
  }
}
