import React from "react";
import { Button, Typography, Box, Divider } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { ThemeProvider } from "@material-ui/styles";
import { Form, useFormik, FormikContext, Field } from "formik";
import { theme } from "../../theme/theme";
import InputMask from "react-input-mask";
import * as Masks from "../../utils/masks";
import * as Schemas from "../../utils/schemas";
import { contactStyles } from "../../assets/styles/styles";
import swal from "sweetalert";
import axios from "axios";

export default function Contact() {
  const classes = contactStyles();

  const values = useFormik({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      estado: "",
      cidade: "",
      assunto: "",
      mensagem: "",
    },
    validationSchema: Schemas.contactSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function enviarContato() {
    try {
      await axios.post("http://localhost:5000/auth/contact", {
        name: values.values.nome,
        email: values.values.email,
        telefone: values.values.telefone,
        uf: values.values.estado,
        cidade: values.values.cidade,
        subject: values.values.assunto,
        message: values.values.mensagem,
      });
      swal({
        text: "Sua mensagem foi enviada com sucesso!",
        icon: "success",
      });
    } catch (error) {
      swal({
        text: "Erro ao enviar mensagem, tente novamente.",
        icon: "error",
      });
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
                      <Field
                        component={TextField}
                        fullWidth
                        id="nome"
                        label="Nome"
                        variant="filled"
                        name="nome"
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
                        label="E-mail"
                        variant="filled"
                        name="email"
                        size="medium"
                        required
                      />
                    </Box>
                    <Box flex="50%" marginLeft={1}>
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
                  <Box className={classes.boxInputs}>
                    <Box flex="100%">
                      <Field
                        component={TextField}
                        fullWidth
                        id="assunto"
                        label="Assunto"
                        variant="filled"
                        name="assunto"
                        size="medium"
                        required
                      />
                    </Box>
                  </Box>
                  <Box className={classes.boxInputs}>
                    <Box flex="100%">
                      <Field
                        component={TextField}
                        fullWidth
                        id="mensagem"
                        label="Mensagem"
                        variant="filled"
                        name="mensagem"
                        size="medium"
                        required
                      />
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
                    onClick={enviarContato}
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
