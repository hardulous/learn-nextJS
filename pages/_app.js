import "@/styles/globals.css"; // Here importing globals.css in _app.js will add it to every page
import { ThemeProvider } from "styled-components";

// Creating a theme to be used by styled-components
const theme = {
  colors: {
    primary: "#355C7D",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
