import { BiblioteksentralenProvider } from "@biblioteksentralen/react";
import { colors, isDevelopment } from "@biblioteksentralen/utils";
import { Box, defineConfig, Grid } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { PlausibleSetup } from "../components/Plausible";

const LogVercelInfo = () => {
  useEffect(() => {
    console.info(
      "%c 🌐 Nestebok versjon:",
      "color: blue",
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? (isDevelopment() ? "development" : "unknown"),
    );
  }, []);

  return null;
};

// Ved chakra bump v2->v3 endret chakra sine gråfarger seg. Hardkoder de gamle verdiene her så bump av chakra ikke endrer utseendet
const customTheme = defineConfig({
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" },
          900: { value: "#171923" },
        },
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nestebok</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <LogVercelInfo />
      <PlausibleSetup />
      <BiblioteksentralenProvider customTheme={customTheme}>
        <Grid templateRows="auto 1fr auto" minHeight="100vh">
          <Header />
          <Box as="main" padding="5vmin 0 30vmin" backgroundColor={colors.grey60} color="white">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Grid>
      </BiblioteksentralenProvider>
    </>
  );
}

export default App;
