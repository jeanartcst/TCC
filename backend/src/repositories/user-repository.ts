export interface UserData {
  email: string;
  password: string;
  name: string;
  last_name: string;
  cnpj_cpf: number;
  address_id: number;
  contact_information_id: number;
}

export interface UserRepository {
  create: (data: UserData) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
