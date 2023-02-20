import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Container, Heading, IconButton, useToast } from "@chakra-ui/react";
  useToast,
} from "@chakra-ui/react";
import {
  FaGithubAlt,
  FaMicrophone,
  FaMicrophoneAlt,
  FaRegTimesCircle,
} from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";
import Langs from "../utils/langs";
import Image from "next/image";

export default function Home() {
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "Create image of *",
      callback: (imageDesc: string) => setMessage(`${imageDesc}`),
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ commands });
  const toast = useToast();
  const [uniqueLangsOptions, setUniqueLangsOptions] = useState([]);

  const [error, setError] = useState("");
  const [selectedLan, setSelectedLang] = useState({ language: "en-US" });
  const [aiImages, setAIImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  // const updateLang = useCallback((e: any) => {
  //   if (e?.value) {
  //     setSelectedLang({
  //       language: e?.value,
  //     });
  //   } else {
  //     setSelectedLang({
  //       language: "en-US",
  //     });
  //   }
  // }, []);

  const generateImage = async () => {
    setLoadingImage(true);
    try {
      const getGeneratedImageResponse = async () => {
        return await (
          await fetch(`/api/openAI/generateImage`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageDescription: message }),
          })
        ).json();
      };

      const getGeneratedImageData = await getGeneratedImageResponse();
      setAIImages(getGeneratedImageData?.data);
      toast({
        title: "Image Generated Successfully",
        status: "success",
        isClosable: true,
      });
      setError("");
      resetMessageAndTranscript();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry, Something went wrong!! we are trying to fix it",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, Something went wrong!! we are trying to fix it");
    }
    setLoadingImage(false);
  };

  const resetMessageAndTranscript = () => {
    resetTranscript();
    setMessage("");
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Sorry, Your Browser does not support speech recognition",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, Your Browser does not support speech recognition");
    }

    if (!isMicrophoneAvailable) {
      toast({
        title: "Sorry, I need microphone to talk with you",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, I need microphone to talk with you");
    }

    const uniqueLangsOptions: any = Langs?.map((v: string) => {
      return {
        label: v,
        value: v,
      };
    });

    setUniqueLangsOptions(uniqueLangsOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  return (
    <>
      <Head>
        <title>The VoiceOver App</title>
        <meta name="description" content="Simple voice over app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="5xl" centerContent>
        <Flex
          minWidth="max-content"
          alignItems="center"
          gap="2"
          pos="fixed"
          top="5"
          zIndex={2}
          boxShadow="xl"
          bgColor="whitesmoke"
        >
          <Box p="2">
            <Heading size="md">The VoiceOver App</Heading>
          </Box>
          <Spacer />
          <a
            href="https://github.com/princephpdev/speak-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heading px="2" size={"md"}>
              <FaGithubAlt />
            </Heading>
          </a>
        </Flex>

        <Box pb="6" pt="24">
          {/* <Box py="8">
            <ReactSelect
              options={uniqueLangsOptions}
              placeholder="Select Your Language"
              onChange={updateLang}
              isClearable
            />
          </Box> */}

          <Center>
            <IconButton
              aria-label="Speak Something new"
              icon={listening ? <FaMicrophoneAlt /> : <FaMicrophone />}
              size="lg"
              onClick={() => SpeechRecognition.startListening(selectedLan)}
              colorScheme={listening ? "red" : "gray"}
              isDisabled={error ? true : false}
            />
            <Text
              mx={2}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              {error ? error : listening ? "Listening..." : "Let's talk"}
            </Text>
          </Center>
          <Text>
            <i>Try saying : </i>
            <b>Create image of -</b> And your description
          </Text>
          <Text>Example - Create image of a mountain</Text>
          <Container maxW="4xl" py="8" centerContent>
            <Heading size="lg">{transcript}</Heading>
            <IconButton
              variant="ghost"
              aria-label="Clear My Speech"
              icon={<FaRegTimesCircle />}
              size="sm"
              onClick={resetMessageAndTranscript}
              colorScheme={"red"}
              hidden={transcript ? false : true}
            />
          </Container>
        </Box>

        <Box alignItems="center" textAlign="center">
          {message && (
            <Heading size="md" py="4" lineHeight="tall">
              <Highlight
                query={message}
                styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
              >
                {`Your image description is: ${message}, Do you want to generate
              Image?`}
              </Highlight>
            </Heading>
          )}
          <Button
            isLoading={loadingImage}
            onClick={generateImage}
            spinnerPlacement="start"
            loadingText="Generating..."
            hidden={message ? false : true}
          >
            Generate Image
          </Button>
          {aiImages?.length > 0 && (
            <SimpleGrid minChildWidth="256px" py="6" spacing="40px">
              {aiImages?.map((aiImage: any, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={`data:image/png;base64,${aiImage?.b64_json}`}
                      alt="Prince K - VoiceOver"
                      width="512"
                      height="512"
                    />
                  </div>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      </Container>
    </>
  );
}
