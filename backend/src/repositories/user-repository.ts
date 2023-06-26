export interface UserData {
  email: string;
  password: string;
  name: string;
  last_name: string;
  cnpj_cpf: string;
  address_id: number;
  contact_information_id: number;
}

export interface UserRepository {
  create: (data: UserData) => Promise<void>;
  read: (id: number) => Promise<UserData | null>;
  update: (id: number, data: UserData) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
