import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

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
            border={"solid 2px white"}
            borderRadius={4}
            w={"40%"}
            minWidth={100}
            height={80}
            color={"black"}
            background={"rgba(255, 255, 255)"}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.1)" }}
            transition={"0.2s"}
            onClick={() => navigate("/daily-challenge")}
          >
            <Text fontSize={16} margin={0} fontWeight={"bold"}>
              Desafio Diário
            </Text>
          </Button>
          <Button
            border={"solid 2px white"}
            borderRadius={4}
            w={"40%"}
            minWidth={100}
            height={80}
            color={"black"}
            background={"rgba(255, 255, 255)"}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.1)" }}
            transition={"0.2s"}
            onClick={() => navigate("/infinite-challenge")}
          >
            <Text fontSize={16} margin={0} fontWeight={"bold"}>
              Desafio Infinito
            </Text>
          </Button>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default Home;
