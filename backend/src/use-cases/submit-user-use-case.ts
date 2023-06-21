import { UserRepository } from "../repositories/user-repository";

interface SubmitUserUseCaseRequest {
  name: string;
  last_name: string;
  email: string;
  cnpj_cpf: number;
  password: string;
  address_id: number;
  contact_information_id: number;
}

export class SubmitUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: SubmitUserUseCaseRequest) {
    const {
      name,
      last_name,
      email,
      cnpj_cpf,
      password,
      address_id,
      contact_information_id,
    } = request;

    if (!name && !last_name) {
      throw new Error("Name and last name cannot be empty!");
    }

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

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
