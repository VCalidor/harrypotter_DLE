import { Flex, HStack, Text } from "@chakra-ui/react";
import { IoSkull } from "react-icons/io5";
import { FaWandSparkles } from "react-icons/fa6";

import { Character } from "../interfaces";
import TipCard from "./TipCard";

const Tips = ({
  selectedCharacters,
  chosenCharacter,
  isDaily,
  hit,
}: {
  selectedCharacters: Character[];
  isDaily: boolean;
  chosenCharacter: Character;
  hit: boolean;
}) => {
  return (
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
        ADIVINHE QUAL É O PERSONAGEM{isDaily ? " DE HOJE" : ""}!
      </Text>
      <HStack
        gap={16}
        w={"100%"}
        flexWrap={"wrap"}
        justifyContent={"space-around"}
      >
        <TipCard
          selectedCharacters={selectedCharacters}
          content={
            typeof chosenCharacter.alive === "string"
              ? [chosenCharacter.alive]
              : chosenCharacter.alive
              ? ["Vivo"]
              : ["Morto"]
          }
          hit={hit}
          icon={IoSkull}
          minTries={3}
        />
        <TipCard
          selectedCharacters={selectedCharacters}
          content={chosenCharacter.wand}
          hit={hit}
          icon={FaWandSparkles}
          minTries={8}
        />
      </HStack>
    </Flex>
  );
};

export default Tips;
