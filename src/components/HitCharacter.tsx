import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Character } from "../interfaces";
import { IoMdClose } from "react-icons/io";
import { RiFullscreenFill } from "react-icons/ri";

const calculateTime = () => {
  const time = new Date();
  time.setHours(1 - time.getHours());
  time.setMinutes(60 - time.getMinutes());
  time.setSeconds(60 - time.getSeconds());
  return time;
};

const formatTime = (time: Date) => {
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return `${hours} : ${minutes} : ${seconds}`;
};

const HitCharacter = ({
  chosenCharacter,
  hits,
  tries,
  isDaily,
  restartChallenge,
  isModal,
  onClose,
  onOpen,
  width = "100%",
}: {
  chosenCharacter: Character;
  hits: number;
  tries: number;
  isDaily: boolean;
  restartChallenge: any;
  isModal: boolean;
  onClose: any;
  onOpen: any;
  width?: string;
}) => {
  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setSeconds(newTime.getSeconds() - 1);

        if (newTime.getTime() <= 0) {
          window.location.reload();
          return prevTime;
        }

        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <VStack
      gap={"2rem"}
      textAlign={"center"}
      position={"relative"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      rounded={"md"}
      w={width}
      maxW={"90%"}
      padding={" clamp(0.6rem, 2.5vw, 2rem)"}
    >
      <IconButton
        position={"absolute"}
        fontSize={"2rem"}
        right={"2rem"}
        top={"2rem"}
        background={"none"}
        border={"none"}
        color={"#A69EB8"}
        aria-label="close"
        icon={isModal ? <IoMdClose /> : <RiFullscreenFill />}
        onClick={() => (isModal ? onClose() : onOpen())}
        transition={".2s"}
        _active={{ background: "none" }}
        _hover={{
          transform: "scale(1.2) rotate(90deg)",
          color: "white",
          cursor: "pointer",
        }}
      />
      <Heading
        as="h2"
        fontSize={"xxx-large"}
        letterSpacing=".03em"
        textShadow="4px 4px 2px rgba(0, 0, 0, 1)"
        color={"#C1C1C1"}
      >
        Parabéns
      </Heading>
      <HStack justifyContent={"space-around"} width={"80%"}>
        <Flex borderRadius={4} width={"10rem"} height={"12rem"}>
          <Image
            borderRadius={4}
            w={"100%"}
            h={"100%"}
            src={chosenCharacter.image}
            alt={chosenCharacter.name}
          />
        </Flex>
        <VStack gap={0}>
          <Text color={"#A69EB8"} fontSize={".8rem"} m={0}>
            Você acertou
          </Text>
          <Text
            fontSize={"2rem"}
            fontFamily={"Harry P"}
            letterSpacing=".03em"
            textShadow="2px 2px 2px rgba(0, 0, 0, 1)"
            color={"#AF811E"}
          >
            {chosenCharacter.name}
          </Text>
        </VStack>
      </HStack>
      <Box>
        <Text>
          Você foi o/a {hits}º a encontrar o personagem
          {isDaily ? " hoje" : ""}!
        </Text>
        <Text marginBottom={0}>Número de tentativas: {tries}</Text>
      </Box>
      {isDaily ? (
        <Box>
          <Text fontSize={"1rem"}>Próximo personagem em aproximadamente:</Text>
          <Text fontSize={24} fontWeight={"bold"} fontFamily={"Harry P"}>
            {formatTime(time)}
          </Text>
        </Box>
      ) : (
        <Button
          variant="buttonVariant"
          onClick={() => {
            restartChallenge();
          }}
        >
          <Text fontSize={16} fontWeight={"bold"} flexWrap={"wrap"}>
            Jogar Novamente
          </Text>
        </Button>
      )}
    </VStack>
  );
};

export default HitCharacter;
