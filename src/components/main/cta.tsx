import {
  chakra,
  Stack,
  useColorModeValue,
  Container,
  Box,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const CTA = () => {
  return (
    <Container maxW="5xl" p="6">
      <Banner />
    </Container>
  );
};

const Banner = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={5}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent="space-between"
      rounded="lg"
      boxShadow="md"
      bg={useColorModeValue("gray.100", "gray.700")}
      p={{ base: 8, md: 16 }}
    >
      <Box>
        <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
          Ready to get started?
        </chakra.h1>
        <chakra.h2
          fontSize="2xl"
          lineHeight={1.2}
          fontWeight="bold"
          bgGradient="linear(to-l, #0ea5e9,#2563eb)"
          bgClip="text"
        >
          Open Source Project
        </chakra.h2>
      </Box>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 0, sm: 3 }}
        w={{ base: "100%", sm: "auto" }}
      >
        <Button
          as={Link}
          href="/voice-image-ai"
          color="white"
          variant="solid"
          size="lg"
          rounded="md"
          mb={{ base: 2, sm: 0 }}
          lineHeight={1}
          bgGradient="linear(to-l, #0ea5e9,#2563eb)"
          _hover={{ bgGradient: "linear(to-l, #0ea5e9,#2563eb)" }}
        >
          Get Started
        </Button>
        <Button
          as={Link}
          href="https://www.buymeacoffee.com/princek"
          size="lg"
          rounded="md"
          mb={{ base: 2, sm: 0 }}
          bg={useColorModeValue("gray.200", "gray.600")}
          _hover={{ bg: useColorModeValue("gray.300", "gray.500") }}
          lineHeight={1}
        >
          Support Us
        </Button>
      </Stack>
    </Stack>
  );
};

export default CTA;
