import { useState } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'swiper/css/bundle'
import Head from 'next/head'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import Nav from '../src/components/nav'

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
      <div className='wrapper'>
        <Head>
          <title>MUSHROOM BOOM!</title>
          <meta name='description' content='Mushroom cataloging application' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
          />
          <meta name='theme-color' content='#000' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='apple-touch-icon' href='/apple-icon.png'></link>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}
