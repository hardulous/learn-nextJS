import Footer from "@/components/Footer";
import Head from "next/head";
import React from "react";

const About = ({ title, description }) => {
  return (
    <>
      {/* Here we have specified head tag for about page which contain its own title and meta tag so it will override the one present in _app.js */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div>About</div>
    </>
  );
};

export default About;

// Here this page prop is About component itself that is JSX returned by About component and now About component have its own layout different from one defined in _app.js

About.getLayout = function PageComponent(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};



// Here the props will contain title and description which is dynamic value consider it coming from backend and will be used in Head component
export async function getServerSideProps() {
  return {
    props: {
      title: "About Page",
      description: "About Page Of Our Website",
    },
  };
}
