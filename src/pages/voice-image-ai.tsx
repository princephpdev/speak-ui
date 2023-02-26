import OverviewSection from "@/components/voice/how-it-works";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Heading,
  Highlight,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaMicrophone,
  FaMicrophoneAlt,
  FaRegTimesCircle,
  FaShare,
} from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceImageAi = () => {
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
  const [error, setError] = useState("");
  const [aiImages, setAIImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const toast = useToast();

  const overviewList = [
    {
      id: 1,
      label: "Click on Let's Talk mic icon",
      subLabel: "Once clicked, it will start listening",
    },
    {
      id: 2,
      label: "Tell what image you want to generate",
      subLabel: "Start with - Create Image of -  and your description",
    },
    {
      id: 3,
      label: "Listen and read the description",
      subLabel:
        "Our AI will read your image description, Check if it's correct as you said",
    },
    {
      id: 4,
      label: "Generate Image",
      subLabel: "If Everything looks okay, click on generate your image",
    },
    {
      id: 5,
      label: "Download and Share",
      subLabel: "You can download and share the image as well",
    },
  ];

  const speakYourText = (text: string, voiceNo = 144) => {
    let speech = new SpeechSynthesisUtterance();
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    speech.text = text ?? "";
    // speech.volume = 1;
    // speech.rate = 1;
    // speech.pitch = 1;
    // 135, 108, 140, 144
    speech.voice = voices[voiceNo];
    synth.speak(speech);
  };

  const generateJoke = async () => {
    try {
      const jokeURL = "https://api.chucknorris.io/jokes/random";
      const res = await fetch(jokeURL);
      const joke = await res.json();
      const replaceChunkToVinod: string = joke?.value?.replace(
        /Chuck Norris/g,
        "Vinod"
      );
      return replaceChunkToVinod;
    } catch (error) {
      console.log(error);
      return "Ohho.. No more jokes left for the day";
    }
  };

  const generateImage = async () => {
    setLoadingImage(true);
    speakYourText("Generating image for you....");
    speakYourText(`It is quick but may take time, sharing a Joke with you`);
    const newJoke = await generateJoke();
    speakYourText(newJoke);

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
      speakYourText("It is almost done... I am updating image for you");
      setAIImages(getGeneratedImageData?.data);
      toast({
        title: "Image Generated Successfully",
        status: "success",
        isClosable: true,
      });
      setError("");
      resetMessageAndTranscript();
      speakYourText("Do you want to generate another?");
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry, Something went wrong!! we are trying to fix it",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, Something went wrong!! we are trying to fix it");
      speakYourText(
        "Sorry, Something went wrong!! we are trying to fix it",
        135
      );
    }
    setLoadingImage(false);
  };

  const resetMessageAndTranscript = () => {
    resetTranscript();
    setMessage("");
  };

  const onDownload = (linkURL: string) => {
    const link = document.createElement("a");
    link.download = `download.png`;
    link.href = linkURL;
    link.target = "_blank";
    link.download;
    link.click();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Sorry, Your Browser does not support speech recognition",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, Your Browser does not support speech recognition");
      speakYourText(
        "Sorry, Your Browser does not support speech recognition",
        135
      );
    }

    if (!isMicrophoneAvailable) {
      toast({
        title: "Sorry, I need microphone to talk with you",
        status: "error",
        isClosable: true,
      });
      setError("Sorry, I need microphone to talk with you");
      speakYourText("Sorry, I need microphone to talk with you", 135);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  useEffect(() => {
    if (message) {
      speakYourText(
        `Ok, You want to generate image of : ${message}?  If So, then Press Generate`
      );
    }
  }, [message]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     speakYourText("Welcome to the Voice Over App");
  //   }, 1000);
  // }, []);

  return (
    <>
      <Head>
        <title>Voice to image - VoiceOver App</title>
        <meta name="description" content="Simple voice over app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box pb="6" pt="24">
        <Center>
          <IconButton
            aria-label="Speak Something new"
            icon={listening ? <FaMicrophoneAlt /> : <FaMicrophone />}
            size="lg"
            onClick={() => SpeechRecognition.startListening()}
            colorScheme={listening ? "red" : "gray"}
            isDisabled={error ? true : false}
          />
          <Text
            mx={2}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="5xl"
            fontWeight="extrabold"
          >
            {error ? error : listening ? "Listening..." : "Let's talk"}
          </Text>
        </Center>
        <Container maxW="4xl" py="8" centerContent>
          <Text>
            <i>Try saying : </i>
            <b>Create image of -</b> And your description
          </Text>
          <Text>
            Example - Create image of a polar bear eating pizza with hot coffee
          </Text>
          <Heading py="4" size="lg">
            {transcript}
          </Heading>
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

      <Container maxW={"5xl"} centerContent>
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
      </Container>
      <Container maxW={"5xl"}>
        {aiImages?.length > 0 && (
          <SimpleGrid minChildWidth="256px" py="6" spacing="40px">
            {aiImages?.map((aiImage: any, index) => {
              return (
                <Card key={index} align="center" variant={"outline"}>
                  <CardBody>
                    <Image
                      src={
                        aiImage?.b64_json
                          ? `data:image/png;base64,${aiImage?.b64_json}`
                          : aiImage?.url
                      }
                      alt="Prince K - VoiceOver"
                      width="256"
                      height="256"
                    />
                  </CardBody>
                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      "& > button": {
                        minW: "136px",
                      },
                    }}
                  >
                    <Button
                      flex="1"
                      variant="ghost"
                      leftIcon={<FaDownload />}
                      onClick={() =>
                        onDownload(
                          aiImage?.b64_json
                            ? `data:image/png;base64,${aiImage?.b64_json}`
                            : aiImage?.url
                        )
                      }
                    >
                      Download
                    </Button>
                    <Button flex="1" variant="ghost" leftIcon={<FaShare />}>
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </Container>
      <Box py={"16"}>
        <Divider />
        <OverviewSection
          imageURL="/assets/images/layouts/project-voiceai.png"
          workList={overviewList}
        />
      </Box>
    </>
  );
};

export default VoiceImageAi;
