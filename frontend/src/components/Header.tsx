import { House } from "phosphor-react";

export function Header() {
  return (
    <div className="flex w-full h-20 border-b-2">
      <h1 className="flex-1 p-4 text-4xl">Cadastrar Usuário</h1>

      <div className="flex-2 p-6 align-center">
        <House size={28} weight="fill" />
      </div>
    </div>
  );
}
