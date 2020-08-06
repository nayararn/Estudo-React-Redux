import React, { useState } from "react";
import { Button, Typography, Box, TextField, Divider } from "@material-ui/core";
import { makeStyles, createStyles, ThemeProvider } from "@material-ui/styles";
import { Form, useFormik, FormikContext } from "formik";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";
import InputMask from "react-input-mask";
import * as Masks from "../utils/masks";

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
    header: {
      width: "100%",
      backgroundColor: "#ffffff",
      height: "120px",
      position: "fixed",
      top: "0",
      boxShadow: "rgba(0, 0, 0, 0.20) 1px 1px 10px",
    },
  })
);

export default function Contact() {
  const classes = useStyles();
  const methods = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      console.log("ok");
    },
  });

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
                      Entre em contato
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerLarge}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="100%">
                      <TextField
                        fullWidth
                        id="nome"
                        label="Nome"
                        variant="filled"
                        name="nome"
                        size="large"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="50%" marginRight={1}>
                      <TextField
                        fullWidth
                        id="email"
                        label="E-mail"
                        variant="filled"
                        name="email"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
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
                        id="estado"
                        label="Estado"
                        variant="filled"
                        name="estado"
                        size="large"
                        required
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
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
                  <Box className={classes.boxInputs}>
                    <Box flex="100%">
                      <TextField
                        fullWidth
                        id="assunto"
                        label="Assunto"
                        variant="filled"
                        name="assunto"
                        size="large"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="100%">
                      <TextField
                        fullWidth
                        id="mensagem"
                        label="Mensagem"
                        variant="filled"
                        name="mensagem"
                        size="large"
                        required
                      />
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      className={classes.button}
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                    >
                      Enviar
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
