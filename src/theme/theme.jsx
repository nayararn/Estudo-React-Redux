import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  button: {
    fontFamily: "Lato, sans-serif",
  },
  palette: {
    type: "light",
    primary: {
      main: "#003451",
      light: "#ffffff",
      dark: "#ffffff",
    },
    secondary: {
      main: "#E9AF00 ",
      light: "#ffffff",
      dark: "#ffffff",
    },
    text: {
      primary: "#003451",
    },
  },
});
