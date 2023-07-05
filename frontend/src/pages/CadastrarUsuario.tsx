import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Forms } from "../components/Forms";

interface Usuario {
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
  pais: string;
  codigo_postal: string;
  nome_curso: string;
  data_matricula: string;
}

export function CadastrarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const data = [
    {
      nome: "pedro",
      ultimo_nome: "pedro",
      email: "string",
      cnpj_cpf: "string",
      senha: "string",
      rua_avenida: "string",
      numero_casa: "string",
      complemento: "string",
      bairro: "string",
      cidade: "string",
      estado: "string",
      pais: "string",
      codigo_postal: "string",
      nome_curso: "string",
      data_matricula: "string",
    },
    {
      nome: "123",
      ultimo_nome: "pedro",
      email: "string",
      cnpj_cpf: "string",
      senha: "string",
      rua_avenida: "string",
      numero_casa: "string",
      complemento: "string",
      bairro: "string",
      cidade: "string",
      estado: "string",
      pais: "string",
      codigo_postal: "string",
      nome_curso: "string",
      data_matricula: "string",
    },
  ];

  useEffect(() => {
    setUsuarios(data);
  }, []);

  // usuarios.map((usuario) => {
  //   console.log(usuario);
  // });
  return (
    <>
      <Header />
      {usuarios.map((usuario) => {
        <div key={usuario.cnpj_cpf}>
          return <Forms />;
        </div>;
      })}
    </>
  );
}
