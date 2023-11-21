import "@/styles/globals.css"; // Here importing globals.css in _app.js will add it to every page
import { ThemeProvider } from "styled-components";
import "@/styles/layout.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

// Creating a theme to be used by styled-components
const theme = {
  colors: {
    primary: "#355C7D",
  },
};

export default function App({ Component, pageProps }) {
  // Now use the getLayout function if it's defined on the page so that instead of default layout defined at the bottom we will use the layout specific for that page.
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
     
     {/* Here this same head tag will be used for all the pages */}
      <Head>
        <title>Webster</title>
        <meta name="description" content="Home Page Of The App" />
      </Head>

      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>

    </>
  );
}
