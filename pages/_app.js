import "@/styles/globals.css"; // Here importing globals.css in _app.js will add it to every page
import { ThemeProvider } from "styled-components";
import "@/styles/layout.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import "@/components/Navbar.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

// Creating a theme to be used by styled-components
const theme = {
  colors: {
    primary: "#355C7D",
  },
};

export default function App({
  Component,
  pageProps: { session, ...pageProps }, // Here if any SSR have passed session object as props it will be available to pageProps as props which then can be passed to SessionProvider component for better performance
}) {
  // Now use the getLayout function if it's defined on the page so that instead of default layout defined at the bottom we will use the layout specific for that page.
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      {/* Here this same head tag will be used for all the pages */}
      {/* 
      <Head>
        <title>Webster</title>
        <meta name="description" content="Home Page Of The App" />
      </Head>

      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>

     */}

      {/* NextJS auth */}
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

// Here this SessionProvider component allow instances of useSession to be shared across whole component tree without getting any bug in session object , Infact it is highly recommended to use this component at top level because it improves performance , reduce network calls to fetch session data of user and avoid page flickers when rendering.
