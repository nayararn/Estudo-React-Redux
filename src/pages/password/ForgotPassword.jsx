import React from "react";
import { Button, Typography, Box, Divider } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Form, useFormik, FormikContext, Field } from "formik";
import { Link } from "react-router-dom";
import { theme } from "../../theme/theme";
import { passwordStyles } from "../../assets/styles/styles";
import * as Schemas from "../../utils/schemas";
import axios from "axios";
import swal from "sweetalert";

export default function ForgotPassword() {
  const classes = passwordStyles();
  const values = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Schemas.forgotPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function alterarSenha() {
    try {
      const resp = await axios.post("http://localhost:5000/auth/recover", {
        email: values.values.email,
      });
      if (resp.data.statusCode !== 200) {
        swal({
          text: "E-mail incorreto.",
          icon: "error",
        });
      } else {
        swal({
          text: "Um e-mail foi enviado para você com a nova senha!",
          icon: "success",
        });
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
                      Esqueci minha senha
                    </Typography>
                  </Box>
                  <Divider
                    className={classes.DividerLarge}
                    orientation="horizontal"
                  />
                </Box>
                <Box>
                  <Box className={classes.boxInputs}>
                    <Box>
                      <Field
                        component={TextField}
                        fullWidth
                        id="email"
                        label="E-mail"
                        variant="filled"
                        name="email"
                        size="medium"
                        required
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                mt={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography color="primary" display="block">
                      Retornar para o login
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  <Button
                    className={classes.button}
                    size="medium"
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={alterarSenha}
                  >
                    Enviar
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
