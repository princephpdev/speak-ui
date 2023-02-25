import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import { FaExternalLinkAlt } from "react-icons/fa";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
  link?: string;
}

const Feature = ({ title, text, icon, link }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
      {link && (
        <Link href={link} isExternal>
          Donate here <FaExternalLinkAlt />
        </Link>
      )}
    </Stack>
  );
};

export default function ThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={"Your Voice, Your Commands"}
          text={
            "With help of voice commands, you can do the magic without typing thousands of words"
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"We Love Donations"}
          text={
            "We are Free and Open Source, But You can support us by donating as low as 10rs. This encourage us to do such things for free"
          }
          link={"https://www.buymeacoffee.com/princek"}
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={"Instant Response"}
          text={
            "Fastest way to get your response is voice and with the help of Open AI, we can do it"
          }
        />
      </SimpleGrid>
    </Box>
  );
}
