/* eslint-disable react-hooks/exhaustive-deps */
import { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf, date, phone } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "currency" | "cpf" | "string" | "date" | "phone";
  prefix: string;
}

export function Input({ mask, prefix, ...rest }: InputProps) {
  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (mask === "cep") {
      cep(e);
    }
    if (mask === "currency") {
      currency(e);
    }
    if (mask === "cpf") {
      cpf(e);
    }
    if (mask === "date") {
      date(e);
    }
    if (mask === "phone") {
      phone(e);
    }
  }, []);

  return (
    <div className="flex align-center text-right justify-end items-center gap-4 py-1">
      {prefix && <span className="font-bold flex-1">{prefix}</span>}
      <input
        {...rest}
        onKeyUp={handleKeyUp}
        className={
          "px-4 bg-zinc-100 py-[2px] rounded-xl border-[1px] font- text-black text-base "
        }
      />
    </div>
  );
}
