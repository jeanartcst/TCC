import { useState } from "react";
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
  ];

  setUsuarios(data);
  console.log(usuarios.length);
  return (
    <>
      <Header />
      <div className="flex p-2 w-full h-screen">
        <div>
          <p>teste</p>
        </div>
        {usuarios.map((usuario) => {
          return (
            <div key={usuario.nome}>
              <div className="w-4 h-4 bg-green-800">
                <p>teste</p>
                <Forms x={2} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
