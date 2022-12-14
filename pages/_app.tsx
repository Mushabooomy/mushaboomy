import { useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Nav from "../src/components/nav";
import Head from "next/head";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient());

  console.log("app");

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
      <Nav />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
