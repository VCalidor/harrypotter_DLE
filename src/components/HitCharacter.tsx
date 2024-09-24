import {
  Box,
  Button,
  Center,
  Flex,
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
}: {
  chosenCharacter: Character;
  hits: number;
  tries: number;
  isDaily: boolean;
  restartChallenge: any;
  isModal: boolean;
  onClose: any;
  onOpen: any;
}) => {
  const [isHovering, setIsHovering] = useState(false);
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
      backgroundColor="rgba(0, 0, 0, .6)"
      borderRadius={6}
      padding={64}
      paddingX={96}
      gap={26}
      marginTop={64}
      color={"white"}
      textAlign={"center"}
      position={"relative"}
    >
      <IconButton
        position={"absolute"}
        fontSize={32}
        right={24}
        top={24}
        background={"none"}
        border={"none"}
        color={"gray"}
        aria-label="close"
        icon={isModal ? <IoMdClose /> : <RiFullscreenFill />}
        onClick={() => (isModal ? onClose() : onOpen())}
        transition={".2s"}
        _hover={{
          transform: "scale(1.2) rotate(90deg)",
          color: "white",
          cursor: "pointer",
        }}
      />
      <Text as={"h2"} margin={0} fontSize={32}>
        Parabéns
      </Text>
      <HStack gap={42}>
        <Flex
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          position={"relative"}
          borderRadius={4}
          width={200}
          height={180}
          transition={".75s"}
          border={"solid 4px black"}
        >
          <Image
            borderRadius={4}
            width={200}
            height={180}
            src={chosenCharacter.image}
            alt={chosenCharacter.name}
          />
          <Center
            position={"absolute"}
            zIndex={10}
            width={200}
            height={180}
            transition={".2s"}
            opacity={isHovering ? 100 : 0}
          >
            <Box
              background={"yellow"}
              borderRadius={4}
              padding={8}
              maxWidth={46}
            >
              <Text color={"black"} margin={"0"} fontSize={12}>
                {chosenCharacter.name}
              </Text>
            </Box>
          </Center>
        </Flex>
        <VStack gap={0}>
          <Text color={"gray"} fontSize={14} marginBottom={4}>
            Você acertou
          </Text>
          <Text margin={0} fontSize={24}>
            {chosenCharacter.name}
          </Text>
        </VStack>
      </HStack>
      <Box>
        <Text margin={0}>
          Você foi o/a {hits}º a encontrar o personagem
          {isDaily ? " hoje" : ""}!
        </Text>
        <Text marginBottom={0}>Número de tentativas: {tries}</Text>
      </Box>
      {isDaily ? (
        <Box>
          <Text margin={0} fontSize={24}>
            Próximo personagem em:
          </Text>
          <Text margin={0} fontSize={24} fontWeight={"bold"}>
            {formatTime(time)}
          </Text>
        </Box>
      ) : (
        <Button
          border={"solid 2px white"}
          borderRadius={4}
          w={"60%"}
          minWidth={160}
          height={80}
          color={"black"}
          background={"rgba(255, 255, 255)"}
          cursor={"pointer"}
          _hover={{ transform: "scale(1.1)" }}
          transition={"0.2s"}
          onClick={() => {
            restartChallenge();
          }}
        >
          <Text fontSize={16} margin={0} fontWeight={"bold"}>
            Jogar Novamente
          </Text>
        </Button>
      )}
    </VStack>
  );
};

export default HitCharacter;
