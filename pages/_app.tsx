import { React, useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import Nav from "../src/components/nav";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <title>MUSH-A-BOOM!</title>
        <meta name="description" content="Mushroom cataloging application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
