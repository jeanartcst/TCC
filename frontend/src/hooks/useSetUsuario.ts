import { useState } from "react";

type UsuarioDataProps = {
  nome: string;
  ultimo_nome: string;
  email: string;
  cnpj_cpf: string;
  senha: string;
  rua_avenida: string;
  numero_casa: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  nacionalidade: string;
  codigo_postal: string;
  nome_curso: string;
  data_matricula: string;
};

//Hook para alterar a visibilidade do menu de navegação
export default function useSetUsuario() {
  const [usuario, setUsuario] = useState<UsuarioDataProps>({
    nome: "",
    ultimo_nome: "",
    email: "",
    cnpj_cpf: "",
    senha: "",
    rua_avenida: "",
    numero_casa: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    nacionalidade: "",
    codigo_postal: "",
    nome_curso: "",
    data_matricula: "",
  });

  return [usuario, setUsuario] as const;
}
