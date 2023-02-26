import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "regenerator-runtime/runtime";
import WithSubnavigation from "@/components/Nav";
import Foot from "@/components/Foot";
import theme from "@/utils/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <WithSubnavigation />
      <Component {...pageProps} />
      <Foot />
    </ChakraProvider>
  );
}
