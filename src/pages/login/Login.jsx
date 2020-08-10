import React from "react";
import {
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Form, useFormik, FormikContext, Field } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { theme } from "../../theme/theme";
import * as Schemas from "../../utils/schemas";
import { loginStyles } from "../../assets/styles/styles";
import swal from "sweetalert";
import axios from "axios";

export default function Login() {
  const classes = loginStyles();
  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState("password");
  const values = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    validationSchema: Schemas.loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function handleClick() {
    if (mostrarSenha) {
      setMostrarSenha(false);
      setChangePassword("password");
    } else {
      setMostrarSenha(true);
      setChangePassword("text");
    }
  }

  async function login() {
    try {
      const resp = await axios.post("http://localhost:5000/auth", {
        email: values.values.login,
        password: values.values.senha,
      });
      localStorage.setItem("token", resp.headers["x-acess-token"]);
      if (resp.data.statusCode !== 200) {
        swal({
          text: "E-mail ou senha incorretos.",
          icon: "error",
        });
      } else {
        window.location.href = "http://localhost:3001/profile";
      }
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
                      <Field
                        component={TextField}
                        fullWidth
                        id="login"
                        label="Login"
                        variant="filled"
                        name="login"
                        size="medium"
                        type="email"
                        required
                      />
                    </Box>
                    <Box>
                      <Field
                        component={TextField}
                        fullWidth
                        id="senha"
                        label="Senha"
                        variant="filled"
                        name="senha"
                        size="medium"
                        type={changePassword}
                        required
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
                  <Button
                    className={classes.button}
                    size="medium"
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={login}
                  >
                    Entrar
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        </FormikContext.Provider>
      </ThemeProvider>
    </>
  );
}
