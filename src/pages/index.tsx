import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Container, Heading, IconButton, useToast } from "@chakra-ui/react";
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

export default function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const toast = useToast();
  const [uniqueLangsOptions, setUniqueLangsOptions] = useState([]);

  const [error, setError] = useState("");
  const [selectedLan, setSelectedLang] = useState({ language: "en-US" });

  const updateLang = useCallback((e: any) => {
    if (e?.value) {
      setSelectedLang({
        language: e?.value,
      });
    } else {
      setSelectedLang({
        language: "en-US",
      });
    }
  }, []);

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
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}>The VoiceOver App</code>
          </p>
          <div>
            <a
              href="https://github.com/princephpdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubAlt />
              <Heading size={"md"}>Prince K</Heading>
            </a>
          </div>
        </div>

        <ReactSelect
          options={uniqueLangsOptions}
          placeholder="Select Your Language"
          onChange={updateLang}
          isClearable
        />

        <div className={styles.center}>
          <IconButton
            aria-label="Speak Something new"
            icon={listening ? <FaMicrophoneAlt /> : <FaMicrophone />}
            size="lg"
            onClick={() => SpeechRecognition.startListening(selectedLan)}
            colorScheme={listening ? "red" : "gray"}
            isDisabled={error ? true : false}
          />
          <Heading mx={2}>
            {error ? error : listening ? "Listening..." : "Let's talk"}
          </Heading>
        </div>

        <Container maxW="2xl" pb="24" centerContent>
          <Heading size="xl">{transcript}</Heading>
          <IconButton
            variant="ghost"
            aria-label="Clear My Speech"
            icon={<FaRegTimesCircle />}
            size="sm"
            onClick={resetTranscript}
            colorScheme={"red"}
            hidden={transcript ? false : true}
          />
        </Container>
      </main>
    </>
  );
}
