import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import { makeStyles, createStyles, ThemeProvider } from "@material-ui/styles";
import { Form, ErrorMessage, FormikContext, Field, Formik } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";
import InputMask from "react-input-mask";
import * as Masks from "../utils/masks";
import * as Yup from "yup";

const useStyles = makeStyles(
  createStyles({
    boxPai: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100%",
      maxWidth: "1000px",
      alignItems: "flex-start",
      margin: "0 auto",
      boxSizing: "border-box",
      paddingTop: "130px",
    },
    input: {
      textTransform: "none",
    },
    form: {
      width: "100%",
    },
    boxInputs: {
      marginBottom: "16px",
      display: "flex",
    },
    DividerLarge: {
      backgroundColor: "#E9AF00",
      width: "75px",
      height: "3px",
    },
    DividerSmall: {
      backgroundColor: "#E9AF00",
      width: "45px",
      height: "3px",
    },
    dicaSenha: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid #dadad1",
      borderRadius: "2px",
      marginRight: "16px",
      paddingLeft: "24px",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
      letterSpacing: "2px",
    },
  })
);

const validationSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório!"),
  sobrenome: Yup.string().required("Campo obrigatório!"),
  cpf: Yup.string().required("Campo obrigatório!"),
  email: Yup.string().email().required("Campo obrigatório!"),
  telefone: Yup.string().required("Campo obrigatório!"),
  nomeEmpresa: Yup.string().required("Campo obrigatório!"),
  cnpj: Yup.string().required("Campo obrigatório!"),
  cep: Yup.string().required("Campo obrigatório!"),
  endereco: Yup.string().required("Campo obrigatório!"),
  numero: Yup.string().required("Campo obrigatório!"),
  estado: Yup.string().required("Campo obrigatório!"),
  cidade: Yup.string().required("Campo obrigatório!"),
});

export default function Register({ handleSubmit, initialValues }) {
  const classes = useStyles();

  const [cpfValues, setCpfValues] = useState("");
  function cpfValue(event) {
    setCpfValues(event.target.value);
  }

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [changePassword, setChangePassword] = useState("password");

  function handleClick() {
    if (mostrarSenha) {
      setMostrarSenha(false);
      setChangePassword("password");
    } else {
      setMostrarSenha(true);
      setChangePassword("text");
    }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
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
                      <Field name="nome">
                        {({ field, form, meta }) => (
                          <TextField
                            fullWidth
                            label="Nome"
                            variant="filled"
                            size="large"
                            type="text"
                            name="nome"
                            id="nome"
                            {...field}
                          >
                            {meta.touched && meta.error && (
                              <p
                                style={{
                                  border: "1px solid red",
                                  color: "red",
                                  fontSize: "30px",
                                }}
                              >
                                {meta.error}
                              </p>
                            )}
                          </TextField>
                        )}
                      </Field>
                    </Box>
                    <Box flex="50%" marginLeft={1}>
                      <TextField
                        fullWidth
                        id="sobrenome"
                        label="Sobrenome"
                        variant="filled"
                        name="sobrenome"
                        size="large"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="33%">
                      <InputMask mask={Masks.maskCPF}>
                        <TextField
                          fullWidth
                          id="cpf"
                          label="CPF"
                          variant="filled"
                          name="cpf"
                          size="large"
                          required
                        />
                      </InputMask>
                    </Box>
                    <Box flex="33%" marginX={2}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        variant="filled"
                        name="email"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="33%">
                      <InputMask mask={Masks.maskTelefone}>
                        <TextField
                          fullWidth
                          id="telefone"
                          label="Telefone"
                          variant="filled"
                          name="telefone"
                          size="large"
                          required
                        />
                      </InputMask>
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
                      <TextField
                        fullWidth
                        id="nomeEmpresa"
                        label="Nome da empresa"
                        variant="filled"
                        name="nomeEmpresa"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
                      <InputMask mask={Masks.maskCNPJ}>
                        <TextField
                          fullWidth
                          id="cnpj"
                          label="CNPJ"
                          variant="filled"
                          name="cnpj"
                          size="large"
                          required
                        />
                      </InputMask>
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
                      <InputMask mask={Masks.maskCEP}>
                        <TextField
                          fullWidth
                          id="cep"
                          label="CEP"
                          variant="filled"
                          name="cep"
                          size="large"
                          required
                        />
                      </InputMask>
                    </Box>
                    <Box flex="55%" marginX={2}>
                      <TextField
                        fullWidth
                        id="endereco"
                        label="Endereço"
                        variant="filled"
                        name="endereco"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="15%">
                      <TextField
                        fullWidth
                        id="numero"
                        label="Número"
                        variant="filled"
                        name="numero"
                        size="large"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="30%">
                      <TextField
                        fullWidth
                        id="complemento"
                        label="Complemento"
                        variant="filled"
                        name="complemento"
                        size="large"
                      />
                    </Box>
                    <Box flex="35%" marginX={2}>
                      <TextField
                        fullWidth
                        id="estado"
                        label="Estado"
                        variant="filled"
                        name="estado"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="35%">
                      <TextField
                        fullWidth
                        id="cidade"
                        label="Cidade"
                        variant="filled"
                        name="cidade"
                        size="large"
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
                        <TextField
                          fullWidth
                          id="senha"
                          label="Senha"
                          variant="filled"
                          name="senha"
                          size="large"
                          type={changePassword}
                          required
                          // value={passwordValues}
                          // onChange={handleChangePassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton type="button" onClick={handleClick}>
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
                        <TextField
                          fullWidth
                          id="confirmarSenha"
                          label="Confirmar senha"
                          variant="filled"
                          name="confirmarSenha"
                          size="large"
                          type={changePassword}
                          required
                          // value={passwordValues}
                          // onChange={handleChangePassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton type="button" onClick={handleClick}>
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
                              size="large"
                              variant="contained"
                              disableElevation
                              color="primary"
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
        </Formik>
      </ThemeProvider>
    </>
  );
}
