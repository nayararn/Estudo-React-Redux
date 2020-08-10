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
import { theme } from "../../theme/theme";
// import InputMask from "react-input-mask";
// import * as Masks from "../../utils/masks";
import * as Schemas from "../../utils/schemas";
import { profileStyles } from "../../assets/styles/styles";
import api from "awesome-cep";
import axios from "axios";
import swal from "sweetalert";

export default function Profile() {
  const classes = profileStyles();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarRNova, setMostrarRNova] = useState(false);
  const [changeType, setChangeType] = useState("password");
  const [changeTypeNew, setChangeTypeNew] = useState("password");
  const [changeTypeRNew, setChangeTypeRNew] = useState("password");

  const values = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "nayara@teste2.com",
      telefone: "",
      cep: "",
      endereco: "",
      complemento: "",
      numero: "",
      estado: "",
      cidade: "",
      senha: "",
      senhaNova: "",
      rSenhaNova: "",
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

  function passwordTypeNew() {
    if (mostrarNova) {
      setMostrarNova(false);
      setChangeTypeNew("password");
    } else {
      setMostrarNova(true);
      setChangeTypeNew("text");
    }
  }

  function passwordTypeRNew() {
    if (mostrarRNova) {
      setMostrarRNova(false);
      setChangeTypeRNew("password");
    } else {
      setMostrarRNova(true);
      setChangeTypeRNew("text");
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

  async function dadosPerfil() {
    try {
      const resp = await axios.get("http://localhost:5000/integrador", {
        headers: {
          "x-acess-token": localStorage.getItem("token"),
        },
      });
      values.setFieldValue("nome", resp.first_name);
      values.setFieldValue("sobrenome", resp.last_name);
      values.setFieldValue("cpf", resp.cpf);
      values.setFieldValue("email", resp.email);
      values.setFieldValue("telefone", resp.telefone);
      values.setFieldValue("cep", resp.cep);
      values.setFieldValue("endereco", resp.endereco);
      values.setFieldValue("complemento", resp.complemento);
      values.setFieldValue("numero", resp.numero);
      values.setFieldValue("uf", resp.estado);
      values.setFieldValue("cidade", resp.cidade);
    } catch (error) {
      console.log(error);
    }
  }

  async function alterarSenha() {
    try {
      const resp = await axios.put("http://localhost:5000/users/update", {
        headers: {
          "x-acess-token": localStorage.getItem("token"),
        },
        password: values.values.senha,
        new_password: values.values.senhaNova,
        new_password_confirm: values.values.rSenhaNova,
      });

      if (resp.data.statusCode !== 200) {
        swal({
          text: "Senhas incorretas.",
          icon: "error",
        });
      } else {
        swal({
          text: "Senha alterada com sucesso!",
          icon: "success",
        });
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

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
                      Meus dados
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
                    <Box flex="50%" marginRight={1}>
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
                    <Box flex="50%" marginLeft={1}>
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
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
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
                    </Box>
                    <Box flex="50%" marginLeft={1}>
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
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="33%" marginRight={1}>
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
                    <Box flex="15%" marginX={1}>
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
                    <Box flex="50%" marginLeft={1}>
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
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
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
                    <Box flex="50%" marginLeft={1}>
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
              <Box display="flex" justifyContent="flex-end">
                <Button
                  className={classes.button}
                  size="medium"
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={dadosPerfil}
                >
                  Alterar dados
                </Button>
              </Box>
              <Box>
                <Box mb={4} display="flex" flexDirection="column">
                  <Box mb={1} mt={6}>
                    <Typography variant="h4" color="primary">
                      Alterar senha
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerLarge}
                    orientation="horizontal"
                  />
                </Box>
                <Box display="flex">
                  <Box display="flex" flexDirection="column" flex="50%" mr={2}>
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="senhaAtual"
                        label="Senha atual"
                        variant="filled"
                        name="senhaAtual"
                        size="medium"
                        type={changeType}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton type="button" onClick={passwordType}>
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
                    <Box mb={2}>
                      <Field
                        component={TextField}
                        fullWidth
                        id="senhaNova"
                        label="Nova senha"
                        variant="filled"
                        name="senhaNova"
                        size="medium"
                        type={changeTypeNew}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton
                                type="button"
                                onClick={passwordTypeNew}
                              >
                                {mostrarNova ? (
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
                        id="rSenhaNova"
                        label="Repetir nova senha"
                        variant="filled"
                        name="rSenhaNova"
                        size="medium"
                        type={changeTypeRNew}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton
                                type="button"
                                onClick={passwordTypeRNew}
                              >
                                {mostrarRNova ? (
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
                  </Box>
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
                </Box>
              </Box>
              <Box mt={2} mb={2}>
                <Button
                  type="submit"
                  className={classes.button}
                  size="medium"
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={alterarSenha}
                >
                  Alterar senha
                </Button>
              </Box>
            </Form>
          </Box>
        </FormikContext.Provider>
      </ThemeProvider>
    </>
  );
}
