import Head from "next/head";
import { Box, Container, Spacer } from "@chakra-ui/react";
import HomeMain from "@/components/main/home";
import ThreeColumns from "@/components/main/threeCol";
import GridBlurredBackdrop from "@/components/main/testimonials";
import MissionSection from "@/components/main/aboutSection";
import CTA from "@/components/main/cta";

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
        <Box pt="16">
          <MissionSection />
        </Box>
        <Box pt="16">
          <ThreeColumns />
        </Box>
        <Box pt="16">
          <GridBlurredBackdrop />
        </Box>
        <Box py="16">
          <CTA />
        </Box>
      </Container>
    </>
  );
}
