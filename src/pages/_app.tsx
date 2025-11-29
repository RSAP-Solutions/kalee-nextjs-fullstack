import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import type { NextPage } from "next";
import React from "react";
import { SiteProfileProvider } from "@/providers/SiteProfileProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";

type PageMeta = {
  title?: string;
  description?: string;
};

export type NextPageWithMeta<P = Record<string, unknown>> = NextPage<P> & {
  meta?: PageMeta;
};

type AppPropsWithMeta = AppProps & {
  Component: NextPageWithMeta;
  pageProps: AppProps["pageProps"] & { meta?: PageMeta };
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithMeta): React.JSX.Element {
  const meta = Component.meta ?? pageProps?.meta ?? {};

  return (
    <SiteProfileProvider>
      <NotificationProvider>
        <Layout title={meta.title} description={meta.description}>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </SiteProfileProvider>
  );
}
