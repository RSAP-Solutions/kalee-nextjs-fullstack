import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({
  title = "Kealee Construction | Residential Renovation & General Contracting",
  description = "Licensed general contractor serving the Washington DC, Maryland, and Northern Virginia region. Full-service renovations, additions, and custom projects.",
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className} flex min-h-screen flex-col bg-white`}>
        <Header />
        <main className="flex-1 bg-white">
          <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
