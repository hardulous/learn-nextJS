import "@/styles/globals.css"; // Here importing globals.css in _app.js will add it to every page
import { ThemeProvider } from "styled-components";
import "@/styles/layout.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Creating a theme to be used by styled-components
const theme = {
  colors: {
    primary: "#355C7D",
  },
};

export default function App({ Component, pageProps }) {
  
  // Now use the getLayout function if it's defined on the page
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
