import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { TextField } from "formik-material-ui";
import { Form, Field, useFormik, FormikContext } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { theme } from "../../theme/theme";
// import InputMask from "react-input-mask";
// import * as Masks from "../../utils/masks";
import * as Schemas from "../../utils/schemas";
import { registerStyles } from "../../assets/styles/styles";
import api from "awesome-cep";
import axios from "axios";
import swal from "sweetalert";

export default function Register() {
  const classes = registerStyles();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarCSenha, setMostrarCSenha] = useState(false);
  const [changeType, setChangeType] = useState("password");
  const [changeCType, setChangeCType] = useState("password");

  const values = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "",
      telefone: "",
      nomeEmpresa: "",
      cnpj: "",
      cep: "",
      endereco: "",
      complemento: "",
      numero: "",
      estado: "",
      cidade: "",
      senha: "",
      csenha: "",
    },
    validationSchema: Schemas.registerSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function passwordType() {
    if (mostrarSenha) {
      setMostrarSenha(false);
      setChangeType("password");
    } else {
      setMostrarSenha(true);
      setChangeType("text");
    }
  }

  function passwordCType() {
    if (mostrarSenha) {
      mostrarCSenha(false);
      setChangeCType("password");
    } else {
      setMostrarCSenha(true);
      setChangeCType("text");
    }
  }

  async function enviarDados() {
    try {
      await axios.post("http://localhost:5000/integrador", {
        first_name: values.values.nome,
        last_name: values.values.sobrenome,
        cpf: values.values.cpf,
        email: values.values.email,
        telefone: values.values.telefone,
        nome_empresa: values.values.nomeEmpresa,
        cnpj: values.values.cnpj,
        cep: values.values.cep,
        endereco: values.values.endereco,
        complemento: values.values.complemento,
        numero: values.values.numero,
        uf: values.values.estado,
        cidade: values.values.cidade,
        password: values.values.senha,
        password_confirm: values.values.csenha,
      });
      swal({
        text: "Cadastro realizado com sucesso!",
        icon: "success",
      });
    } catch (error) {
      swal({
        text: "Erro ao efetuar cadastro.",
        icon: "error",
      });
    }
  }

  async function buscaCep() {
    try {
      const resp = await api.findCEP(values.values.cep);
      values.setFieldValue("cep", resp.cep);
      values.setFieldValue("endereco", resp.address_name);
      values.setFieldValue("estado", resp.state);
      values.setFieldValue("cidade", resp.city);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (values.values.cep.length === 8) {
      buscaCep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.values.cep]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <FormikContext.Provider value={values}>
          <Box className={classes.boxPai}>
            <Form className={classes.form}>
              <Box>
                <Box
                  mt={3}
                  mb={5}
                  display="flex"
                  flexDirection="column"
                  flexWrap="wrap"
                >
                  <Box mb={1}>
                    <Typography variant="h4" color="primary">
                      Quero me cadastrar na Sapir
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerLarge}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
                      <Field
                        component={TextField}
                        name="nome"
                        fullWidth
                        label="Nome"
                        variant="filled"
                        size="medium"
                        type="text"
                        id="nome"
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="sobrenome"
                        label="Sobrenome"
                        variant="filled"
                        name="sobrenome"
                        size="medium"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="33%">
                      {/* <InputMask mask={Masks.maskCPF}> */}
                      <Field
                        component={TextField}
                        fullWidth
                        id="cpf"
                        label="CPF"
                        variant="filled"
                        name="cpf"
                        size="medium"
                        required
                      />
                      {/* </InputMask> */}
                    </Box>
                    <Box flex="33%" marginX={2}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="email"
                        label="Email"
                        variant="filled"
                        name="email"
                        size="medium"
                        required
                      />
                    </Box>
                    <Box flex="33%">
                      {/* <InputMask mask={Masks.maskTelefone}> */}
                      <Field
                        component={TextField}
                        fullWidth
                        id="telefone"
                        label="Telefone"
                        variant="filled"
                        name="telefone"
                        size="medium"
                        required
                      />
                      {/* </InputMask> */}
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="nomeEmpresa"
                        label="Nome da empresa"
                        variant="filled"
                        name="nomeEmpresa"
                        size="medium"
                        required
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
                      {/* <InputMask mask={Masks.maskCNPJ}> */}
                      <Field
                        component={TextField}
                        fullWidth
                        id="cnpj"
                        label="CNPJ"
                        variant="filled"
                        name="cnpj"
                        size="medium"
                        required
                      />
                      {/* </InputMask> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box mb={3} display="flex" flexDirection="column">
                  <Box mb={1}>
                    <Typography
                      color="primary"
                      style={{ fontWeight: "bold", fontSize: "1.125rem" }}
                    >
                      Endereço
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerSmall}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="30%">
                      {/* <InputMask mask={Masks.maskCEP}> */}
                      <Field
                        component={TextField}
                        fullWidth
                        id="cep"
                        label="CEP"
                        variant="filled"
                        name="cep"
                        size="medium"
                        required
                      />
                      {/* </InputMask> */}
                    </Box>
                    <Box flex="55%" marginX={2}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="endereco"
                        label="Endereço"
                        variant="filled"
                        name="endereco"
                        size="medium"
                        required
                      />
                    </Box>
                    <Box flex="15%">
                      <Field
                        component={TextField}
                        fullWidth
                        id="numero"
                        label="Número"
                        variant="filled"
                        name="numero"
                        size="medium"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="30%">
                      <Field
                        component={TextField}
                        fullWidth
                        id="complemento"
                        label="Complemento"
                        variant="filled"
                        name="complemento"
                        size="medium"
                      />
                    </Box>
                    <Box flex="35%" marginX={2}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="estado"
                        label="Estado"
                        variant="filled"
                        name="estado"
                        size="medium"
                        required
                      />
                    </Box>
                    <Box flex="35%">
                      <Field
                        component={TextField}
                        fullWidth
                        id="cidade"
                        label="Cidade"
                        variant="filled"
                        name="cidade"
                        size="medium"
                        required
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box mb={3} display="flex" flexDirection="column">
                  <Box mb={1}>
                    <Typography
                      variant="h6"
                      color="primary"
                      style={{ fontWeight: "bold", fontSize: "1.125rem" }}
                    >
                      Agora escolha sua senha
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerSmall}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" className={classes.dicaSenha}>
                      <Typography variant="subtitle1" color="primary">
                        <Box fontWeight={600} marginX={2} pt={4} pb={1}>
                          Dicas de senha
                        </Box>
                      </Typography>
                      <Box pb={4}>
                        <Box
                          display="flex"
                          alignItems="center"
                          marginX={1}
                          marginY={0}
                        >
                          <CheckCircleOutlineOutlinedIcon
                            fontSize="small"
                            color="disabled"
                          />
                          <Typography variant="subtitle1" color="primary">
                            <Box pl={1}>Pelo menos 8 caracteres;</Box>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          marginX={1}
                          marginY={0}
                        >
                          <CheckCircleOutlineOutlinedIcon
                            fontSize="small"
                            color="disabled"
                          />
                          <Typography variant="subtitle1" color="primary">
                            <Box pl={1}>Pelo menos 1 caractere minúsculo;</Box>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          marginX={1}
                          marginY={0}
                        >
                          <CheckCircleOutlineOutlinedIcon
                            fontSize="small"
                            color="disabled"
                          />
                          <Typography variant="subtitle1" color="primary">
                            <Box pl={1}>Pelo menos 1 caractere maiúsculo.</Box>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className={classes.boxInputs}
                      flexDirection="column"
                      flex="50%"
                    >
                      <Box mb={2}>
                        <Field
                          component={TextField}
                          fullWidth
                          id="senha"
                          label="Senha"
                          variant="filled"
                          name="senha"
                          size="medium"
                          type={changeType}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton
                                  type="button"
                                  onClick={passwordType}
                                >
                                  {mostrarSenha ? (
                                    <Visibility color="primary" />
                                  ) : (
                                    <VisibilityOff color="primary" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <Box>
                        <Field
                          component={TextField}
                          fullWidth
                          id="csenha"
                          label="Confirmar senha"
                          variant="filled"
                          name="csenha"
                          size="medium"
                          type={changeCType}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton
                                  type="button"
                                  onClick={passwordCType}
                                >
                                  {mostrarCSenha ? (
                                    <Visibility color="primary" />
                                  ) : (
                                    <VisibilityOff color="primary" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        mt={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Link to="/" style={{ textDecoration: "none" }}>
                            <Typography color="primary" display="block">
                              Já tenho cadastro
                            </Typography>
                          </Link>
                        </Box>
                        <Box>
                          <Link to="/" style={{ textDecoration: "none" }}>
                            <Button
                              type="submit"
                              className={classes.button}
                              size="medium"
                              variant="contained"
                              disableElevation
                              color="primary"
                              onClick={enviarDados}
                            >
                              Cadastrar
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Form>
          </Box>
        </FormikContext.Provider>
      </ThemeProvider>
    </>
  );
}
