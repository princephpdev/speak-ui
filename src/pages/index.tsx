import Head from "next/head";
import { Container } from "@chakra-ui/react";
import HomeMain from "@/components/main/home";
import ThreeColumns from "@/components/main/threeCol";
import GridBlurredBackdrop from "@/components/main/testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - VoiceOver App</title>
        <meta name="description" content="Simple voice over app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"7xl"} centerContent>
        <HomeMain />
        <ThreeColumns />
        <GridBlurredBackdrop />
      </Container>
    </>
  );
}
