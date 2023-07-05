import { Input } from "./Input";

import { getLocalidadeData } from "../libs/viacep";
import useSetUsuario from "../hooks/useSetUsuario";

const formData = {
  nome: {
    title: "Nome",
    placeholder: "Nome",
    type: "text",
    group: "identificacao",
  },
  ultimo_nome: {
    title: "Último Nome",
    placeholder: "Último Nome",
    type: "text",
    group: "identificacao",
  },
  email: {
    title: "E-mail",
    placeholder: "Seu e-mail aqui",
    type: "text",
    group: "identificacao",
  },
  cnpj_cpf: {
    title: "CNPJ/CPF",
    placeholder: "Insira o número do documento",
    type: "text",
    group: "identificacao",
  },
  senha: {
    title: "Senha",
    placeholder: "Crie uma senha",
    type: "text",
    group: "seguranca",
  },
  rua_avenida: {
    title: "Rua/Avenida",
    placeholder: "Rua da residência",
    type: "text",
    group: "residencia",
  },
  numero_casa: {
    title: "Número da casa",
    placeholder: "99",
    type: "text",
    group: "residencia",
  },
  complemento: {
    title: "Complemento",
    placeholder: "Fundos",
    type: "text",
    group: "residencia",
  },
  bairro: {
    title: "Bairro",
    placeholder: "Bairro",
    type: "text",
    group: "residencia",
  },
  cidade: {
    title: "Cidade",
    placeholder: "Cidade",
    type: "text",
    group: "residencia",
  },
  estado: {
    title: "Estado",
    placeholder: "Estado",
    type: "text",
    group: "residencia",
  },
  nacionalidade: {
    title: "País",
    placeholder: "País",
    type: "text",
    group: "residencia",
  },
  codigo_postal: {
    title: "CEP",
    placeholder: "00000-000",
    type: "cep",
    group: "residencia",
  },
  nome_curso: {
    title: "Curso Atual",
    placeholder: "Nome do curso Atual",
    type: "text",
    group: "escolaridade",
  },
  data_matricula: {
    title: "Data da matricula",
    placeholder: "Data da matricula no curso",
    type: "text",
    group: "escolaridade",
  },
};

export type FormProps = keyof typeof formData;
export type FormTypes = "cep" | "currency" | "string" | "date" | "string";

export function Forms() {
  const [usuario, setUsuario] = useSetUsuario();

  function handleChangeProps(
    prop: FormProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setUsuario({
      ...usuario,
      [prop]: event.target.value,
    });
  }

  return (
    <div>
      <div>
        <form>
          {Object.entries(formData).map(([key, value]) => {
            async function getInformationArea(props: number) {
              await getLocalidadeData(props).then((data) => {
                let cidade,
                  estado,
                  rua_avenida,
                  bairro = "";

                (cidade = data.localidade),
                  (estado = data.uf),
                  (rua_avenida = data.logradouro),
                  (bairro = data.bairro);

                setUsuario({
                  ...usuario,
                  cidade,
                  estado,
                  rua_avenida,
                  bairro,
                });
              });
            }

            function handleOnBlur(e: React.FormEvent<HTMLInputElement>) {
              if (key === "codigo_postal") {
                const value = e.currentTarget.value;
                const cep_number: number = parseInt(value.replace("-", ""));
                getInformationArea(cep_number);
              }
            }

            const formProps: FormProps = key as FormProps;
            const typeOfInput: FormTypes = value.type as FormTypes;

            return (
              <div className="">
                <Input
                  key={key}
                  mask={typeOfInput}
                  onBlur={handleOnBlur}
                  prefix={value.title + ":"}
                  placeholder={value.placeholder}
                  value={usuario[formProps]}
                  onChange={(event) => handleChangeProps(formProps, event)}
                />
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}
