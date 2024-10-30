const prompt = require("prompt-sync")({ sigint: true });

// Função para validar se o usuário é maior de 18 anos
const isOver18 = (birthDate) => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  return month > 0 || (month === 0 && today.getDate() >= birthDate.getDate())
    ? age >= 18
    : age > 18;
};

// Funções para validação dos campos
const validateName = (name) => (name.length >= 5 ? name : null);
const validateCPF = (cpf) => {
  if (/^\d{11}$/.test(cpf)) {
    // Formata o CPF para 999.999.999-99
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return null;
};
const validateBirthDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  const date = new Date(year, month - 1, day);
  return isOver18(date) ? date : null;
};
const validateIncome = (income) => {
  const parsedIncome = parseFloat(income.replace(",", "."));
  return parsedIncome >= 0 ? parsedIncome : null;
};
const validateCivilStatus = (status) => /^[cCsSvVdD]$/.test(status) ? status.toUpperCase() : null;
const validateDependents = (dependents) => {
  const number = Number(dependents);
  return number >= 0 && number <= 10 ? number : null;
};

// Função para ler e validar entrada do usuário
const getValidInput = (message, validationFunc) => {
  while (true) {
    const input = prompt(message);
    const isValid = validationFunc(input);
    if (isValid !== null && isValid !== false) return isValid;
    console.log("Entrada inválida. Tente novamente.");
  }
};

// Capturando e validando dados do usuário
const nome = getValidInput("Nome (pelo menos 5 caracteres): ", validateName);
const cpf = getValidInput("CPF (exatamente 11 dígitos): ", validateCPF);
const nascimento = getValidInput(
  "Data de Nascimento (DD/MM/AAAA, pelo menos 18 anos): ",
  validateBirthDate
);
const rendaMensal = getValidInput(
  "Renda Mensal (ex: 2500,00): ",
  validateIncome
);
const estadoCivil = getValidInput(
  "Estado Civil (C, S, V, D): ",
  validateCivilStatus
);
const dependentes = getValidInput("Dependentes (0 a 10): ", validateDependents);

// Exibindo os dados finais do cliente
console.log("\nDados do Cliente:");
console.log(`Nome: ${nome}`);
console.log(`CPF: ${cpf}`);
console.log(`Data de Nascimento: ${nascimento.toLocaleDateString("pt-BR")}`);
console.log(`Renda Mensal: ${rendaMensal.toFixed(2).replace(".", ",")}`);
console.log(`Estado Civil: ${estadoCivil}`);
console.log(`Dependentes: ${dependentes}`);
