export interface UserData {
  email: string;
  password: string;
  name: string;
  last_name: string;
  cnpj_cpf: string;
  street_avenue: string | null;
  house_number: string | null;
  complement: string | null;
  neighbor_name: string | null;
  city: string;
  state: string;
  zip_code: number;
  country: string;
  current_course?: string;
  enrollment_data: Date;
  phone_number: string;
}

export interface UserRepository {
  create: (data: UserData) => Promise<void>;
  read: (id: number) => Promise<UserData>;
  update: (id: number, data: UserData) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
