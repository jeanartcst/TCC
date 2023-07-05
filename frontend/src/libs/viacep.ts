import axios from "axios";

export const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws",
});

export interface Props {
  cep: number;
}

type viacepProps = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: number;
  gia: number;
  ddd: number;
  siafi: number;
};

export async function getLocalidadeData(cep: Number) {
  const localidadeData: viacepProps = await viacep
    .get(`${cep}/json/`)
    .then((response) => response.data);

  JSON.stringify(localidadeData);

  return localidadeData;
}
