import "../styles/common.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { StaticRouter } from "react-router-dom";
// import { appWithTranslation } from "next-i18next";
// import { LoaderProvider } from "../common/loader-provider/loaderProvider";
import { PopupProvider } from "../common/popup-provider/popupProvider";
import Head from "next/head";
import ScrollTop from "../components/scrollTop/scrollTop";
import Layout from "../common/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {/* <LoaderProvider> */}
      <PopupProvider>
        <StaticRouter
          basename={
            process.env.REACT_APP_BASE_NAME
              ? process.env.REACT_APP_BASE_NAME
              : "/ontelo/"
          }
        >
          <ScrollTop />
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </StaticRouter>
      </PopupProvider>
      {/* </LoaderProvider> */}
    </div>
  );
}
export default MyApp;
