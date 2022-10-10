import { BiblioteksentralenProvider, Box, colors, Grid, isDevelopment } from "@biblioteksentralen/js-utils";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LekeplassBanner from "../../components/LekeplassBanner";
import { PlausibleSetup } from "../../components/Plausible";

const LogVercelInfo = () => {
  useEffect(() => {
    console.info(
      "%c 🌐 Nestebok versjon:",
      "color: blue",
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? (isDevelopment() ? "development" : "unknown")
    );
  }, []);

  return null;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LogVercelInfo />
      <PlausibleSetup />
      <Head>
        <title>Neste bok</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <BiblioteksentralenProvider>
        <LekeplassBanner />
        <Grid templateRows="auto 1fr auto" minHeight="100vh">
          <Header />
          <Box as="main" padding="15vmin 0 30vmin" backgroundColor={colors.grey60}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Grid>
      </BiblioteksentralenProvider>
    </>
  );
}

export default App;
