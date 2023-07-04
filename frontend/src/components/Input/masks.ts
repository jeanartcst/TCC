/* eslint-disable no-useless-escape */
export function cep(e: React.FormEvent<HTMLInputElement>) {
  let fullFiled = false;
  e.currentTarget.maxLength = 9;

  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  e.currentTarget.value = value;

  if (value.length == 9) {
    fullFiled = true;
    return [e, fullFiled, value];
  }

  return [e, fullFiled];
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
}

export function cpf(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;
  let value = e.currentTarget.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
    e.currentTarget.value = value;
  }
  return e;
}

export function date(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 10;
  let value = e.currentTarget.value;
  if (!value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})$/, "$1");
    e.currentTarget.value = value;
  }
  return e;
}

export function phone(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;
  const checked = true;

  let value = e.currentTarget.value;
  if (!value.match(/^\((\d{2})\)((\d{4})|(\d{5}))\-(\d{4})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1)$2");
    value = value.replace(/((\d{5})(\d))/, "$2-$3");
    e.currentTarget.value = value;
  }
  return [e, checked];
}
