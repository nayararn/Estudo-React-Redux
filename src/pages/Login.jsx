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
import { Form, useFormik, FormikContext } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";

const useStyles = makeStyles(
  createStyles({
    boxPai: {
      display: "flex",
      flexDirection: "column",
      height: "75vh",
      width: "100%",
      maxWidth: "1000px",
      alignItems: "flex-start",
      margin: "0 auto",
      paddingTop: "170px",
      boxSizing: "border-box",
    },
    input: {
      textTransform: "none",
    },
    form: {
      width: "45%",
    },
    boxInputs: {
      marginBottom: "16px",
      display: "flex",
      flexDirection: "column",
    },
    DividerLarge: {
      backgroundColor: "#E9AF00",
      width: "75px",
      height: "3px",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
      letterSpacing: "2px",
    },
  })
);

export default function Login() {
  const [emailValues, setEmailValues] = React.useState("");
  const [passwordValues, setPasswordValues] = React.useState("");

  function handleChangeEmail(event) {
    setEmailValues(event.target.value);
  }

  function handleChangePassword(event) {
    setPasswordValues(event.target.value);
  }

  const classes = useStyles();
  const methods = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      console.log("logado");
    },
  });

  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState("password");

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
        <FormikContext.Provider value={methods}>
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
                      Login
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerLarge}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        id="login"
                        label="Login"
                        variant="filled"
                        name="login"
                        size="large"
                        required
                      />
                    </Box>
                    <Box>
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
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                mt={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Box>
                    <Link
                      to="/forgotPassword"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography color="primary" display="block">
                        Esqueci minha senha
                      </Typography>
                    </Link>
                    <Box>
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <Typography color="primary" display="block">
                          Não tem uma conta? Cadastre-se
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      className={classes.button}
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                    >
                      Entrar
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Form>
          </Box>
        </FormikContext.Provider>
      </ThemeProvider>
    </>
  );
}
