import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  sobrenome: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  telefone: Yup.string().required("Campo obrigatório"),
  nomeEmpresa: Yup.string().required("Campo obrigatório"),
  cnpj: Yup.string().required("Campo obrigatório"),
  cep: Yup.string().required("Campo obrigatório"),
  numero: Yup.string().required("Campo obrigatório"),
  endereco: Yup.string().required("Campo obrigatório"),
  estado: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
});

export const contactSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  telefone: Yup.string().required("Campo obrigatório"),
  estado: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  assunto: Yup.string().required("Campo obrigatório"),
  mensagem: Yup.string().required("Campo obrigatório"),
});

export const loginSchema = Yup.object().shape({
  login: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
});
