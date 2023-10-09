import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {getLayout(
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        )}
      </QueryClientProvider>
    </MantineProvider>
  );
}
