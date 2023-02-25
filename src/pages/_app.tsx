import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "regenerator-runtime/runtime";
import WithSubnavigation from "@/components/Nav";
import Foot from "@/components/Foot";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WithSubnavigation />
      <Component {...pageProps} />
      <Foot />
    </ChakraProvider>
  );
}
