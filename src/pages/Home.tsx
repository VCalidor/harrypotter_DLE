import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoInfiniteSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <VStack
        maxW={500}
        width={"80%"}
        backgroundColor="rgb(11, 9, 13, .7)"
        border={"1px solid rgb(51, 47, 64, .7)"}
        borderRadius={6}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"1.5rem"}
        paddingY={"2rem"}
        gap={"1.5rem"}
      >
        <Text fontSize={"1.2rem"} textShadow="2px 2px 0 rgba(0, 0, 0, .7)">
          Escolha o desafio!
        </Text>
        <HStack w={"100%"} flexWrap={"wrap"} justifyContent={"space-around"}>
          <Button
            variant="buttonVariant"
            onClick={() => navigate("/daily-challenge")}
            position={"relative"}
            flexWrap={"wrap"}
          >
            <Icon as={FaCalendarDays} boxSize={"1.8rem"} color={"#0B090D"} />
            <Icon
              boxSize={"2rem"}
              as={FaCalendarDays}
              color={"#0B090D"}
              position={"absolute"}
              opacity={0.5}
              filter="blur(2px)"
            />
            <Text
              position={"absolute"}
              bottom={".3rem"}
              fontWeight={"bold"}
              fontSize={".8rem"}
              color={"#867F83"}
              textShadow="1px 1px 0 #332F40"
            >
              Desafio diário
            </Text>
          </Button>
          <Button
            variant="buttonVariant"
            onClick={() => navigate("/infinite-challenge")}
            flexWrap={"wrap"}
          >
            <Icon as={IoInfiniteSharp} boxSize={"2.8rem"} color={"#0B090D"} />
            <Icon
              boxSize={"3rem"}
              color={"#0B090D"}
              as={IoInfiniteSharp}
              position={"absolute"}
              opacity={0.7}
              filter="blur(2px)"
            />
            <Text
              position={"absolute"}
              bottom={".3rem"}
              fontWeight={"bold"}
              fontSize={".8rem"}
              color={"#867F83"}
              textShadow="1px 1px 0 #332F40"
            >
              Desafio infinito
            </Text>
          </Button>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default Home;
