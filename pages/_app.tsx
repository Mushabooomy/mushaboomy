import { useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Nav from "../src/components/nav";
import Head from "next/head";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <div className="container">
        <Head>
          <title>MUSH-A-BOOM!</title>
          <meta name="description" content="Mushroom cataloging application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}
