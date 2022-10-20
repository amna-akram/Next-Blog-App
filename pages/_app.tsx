import React, { useState } from "react";
import type { AppProps } from 'next/app'

import Layout from "../components/Layout/Layout";
import { ModalContextProvider } from "../store/modal-context";
import { ApolloProvider } from "@apollo/client";

import client from "../libs/apollo"

import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);

  function toggleTheme(event: React.ChangeEvent<HTMLInputElement>) {
    const desiredTheme = event.target.checked ? lightTheme : darkTheme;
    setActiveTheme(desiredTheme);
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <ModalContextProvider>
          <Layout onThemeChangeHandler={toggleTheme}>
          <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ModalContextProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
