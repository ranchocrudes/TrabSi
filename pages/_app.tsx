import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  const queryclient = new QueryClient();

  return (
    <QueryClientProvider client={queryclient}>
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
