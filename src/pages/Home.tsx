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
        backgroundColor="rgba(0, 0, 0, 0.6)"
        borderRadius={6}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"1.5rem"}
        paddingY={"2rem"}
        gap={"1.5rem"}
      >
        <Text
          fontSize={"1.2rem"}
          margin={0}
          textShadow="2px 2px 0 rgba(0, 0, 0, .7)"
        >
          Escolha o desafio!
        </Text>
        <HStack w={"100%"} flexWrap={"wrap"} justifyContent={"space-around"}>
          <Button
            variant="buttonVariant"
            onClick={() => navigate("/daily-challenge")}
            position={"relative"}
          >
            <Icon as={FaCalendarDays} boxSize={"1.8rem"} />
            <Icon
              boxSize={"2rem"}
              as={FaCalendarDays}
              color={"rgb(60,60,60)"}
              position={"absolute"}
              opacity={0.5}
              filter="blur(2px)"
            />
            <Text
              position={"absolute"}
              bottom={".3rem"}
              fontWeight={"bold"}
              fontSize={".8rem"}
              color={"gray"}
              textShadow=".5px .5px 0 rgba(0, 0, 0, .4)"
            >
              Desafio diário
            </Text>
          </Button>
          <Button
            variant="buttonVariant"
            onClick={() => navigate("/infinite-challenge")}
          >
            <Icon as={IoInfiniteSharp} boxSize={"2.8rem"} />
            <Icon
              boxSize={"3rem"}
              color={"rgb(60,60,60)"}
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
              color={"gray"}
              textShadow=".5px .5px 0 rgba(0, 0, 0, .4)"
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
