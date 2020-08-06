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
import { Visibility, VisibilityOff, CodeSharp } from "@material-ui/icons";
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

export default function ForgotPassword() {
  const [emailValues, setEmailValues] = React.useState("");

  function handleChangeEmail(event) {
    setEmailValues(event.target.value);
  }

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
