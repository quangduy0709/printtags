import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import "../styles/index.css";
import { createWrapper } from "next-redux-wrapper";
import Head from "next/head";

import PageWithLayoutType from "../components/Layout/pageWithLayouts";
import { ReactElement } from "react";

type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout =
    Component.layout ||
    ((children: ReactElement) => {
      children;
    });
  return (
    <>
      <Head>
        <title>Print Tags</title>
        <meta property="og:title" content="Print Tags" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="Print Tags" key="title" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
