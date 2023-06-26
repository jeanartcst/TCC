export interface AddressData {
  street_avenue: string | null;
  house_number: string | null;
  complement: string | null;
  neighbor_name: string | null;
  city: string;
  state: string;
  zip_code: number;
  country: string;
}

export interface AddressRepository {
  create: (data: AddressData) => Promise<number>;
  read: (id: number) => Promise<AddressData>;
  update: (id: number, data: AddressData) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
