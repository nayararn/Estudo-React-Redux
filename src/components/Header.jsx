import React from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles, createStyles, ThemeProvider } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";
import logo from "../assets/img/logo.png";

const useStyles = makeStyles(
  createStyles({
    header: {
      width: "100%",
      backgroundColor: "#ffffff",
      height: "120px",
      position: "fixed",
      top: "0",
      boxShadow: "rgba(0, 0, 0, 0.20) 1px 1px 10px",
      zIndex: "100",
    },
    link: {
      textDecoration: "none",
    },
    items: {
      "&:hover": {
        borderBottom: "3px solid #003451",
      },
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={classes.header}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            maxWidth="1000px"
            margin="0 auto"
            pt={1}
          >
            <Box>
              <img width="170px" src={logo} alt="logo-sapir" />
            </Box>
            <Box display="flex" justifyContent="space-around" width="320px">
              <Box>
                <Link to="/contact" className={classes.link}>
                  <Typography
                    className={classes.items}
                    variant="subtitle2"
                    color="primary"
                  >
                    <Box fontWeight="bold">CONTATO</Box>
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link to="/register" className={classes.link}>
                  <Typography
                    className={classes.items}
                    variant="subtitle2"
                    color="primary"
                  >
                    <Box fontWeight="bold">CADASTRE-SE</Box>
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link to="/" className={classes.link}>
                  <Typography
                    className={classes.items}
                    variant="subtitle2"
                    color="primary"
                  >
                    <Box fontWeight="bold">LOGIN</Box>
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
