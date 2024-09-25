import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoInfiniteSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <VStack
      w={"100%"}
      paddingTop={50}
      color={"white"}
      textAlign={"center"}
      gap={24}
      marginBottom={120}
    >
      <Text as="h1" margin={0}>
        Mundo Bruxo
      </Text>
      <Flex
        maxW={400}
        width={"80%"}
        backgroundColor="rgba(0, 0, 0, 0.6)"
        borderRadius={6}
        alignItems={"center"}
        flexDirection={"column"}
        padding={16}
        paddingY={32}
        gap={26}
      >
        <Text fontSize={20} margin={0}>
          Escolha o modo!
        </Text>
        <HStack
          gap={16}
          w={"100%"}
          flexWrap={"wrap"}
          justifyContent={"space-around"}
        >
          <Button
            border={"solid 4px white"}
            borderBottom={"solid 4px gray"}
            borderRight={"solid 4px gray"}
            borderRadius={4}
            w={"40%"}
            minWidth={100}
            height={80}
            color={"black"}
            background={"rgba(230, 230, 230)"}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.1)" }}
            transition={"0.2s"}
            onClick={() => navigate("/daily-challenge")}
            position={"relative"}
          >
            <Icon as={FaCalendarDays} boxSize={26} />
            <Icon
              boxSize={32}
              as={FaCalendarDays}
              color={"rgb(60,60,60)"}
              position={"absolute"}
              opacity={0.5}
              filter="blur(2px)"
            />
            <Text
              position={"absolute"}
              bottom={-8}
              fontWeight={"bold"}
              color={"gray"}
            >
              Desafio diário
            </Text>
          </Button>
          <Button
            border={"solid 4px white"}
            borderBottom={"solid 4px rgba(173, 173, 173)"}
            borderRight={"solid 4px rgba(173, 173, 173)"}
            background={"rgba(230, 230, 230)"}
            borderRadius={4}
            w={"40%"}
            minWidth={100}
            height={80}
            color={"black"}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.1)" }}
            transition={"0.2s"}
            onClick={() => navigate("/infinite-challenge")}
          >
            <Icon as={IoInfiniteSharp} boxSize={40} />
            <Icon
              boxSize={44}
              color={"rgb(60,60,60)"}
              as={IoInfiniteSharp}
              position={"absolute"}
              opacity={0.7}
              filter="blur(2px)"
            />
            <Text
              position={"absolute"}
              bottom={-8}
              fontWeight={"bold"}
              color={"gray"}
            >
              Desafio infinito
            </Text>
          </Button>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default Home;
