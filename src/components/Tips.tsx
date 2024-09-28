import { HStack, Text, VStack } from "@chakra-ui/react";
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
    <VStack
      maxW={500}
      width={"80%"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      borderRadius={6}
      alignItems={"center"}
      flexDirection={"column"}
      paddingX={".8rem"}
      paddingY={"2rem"}
      gap={"1.5rem"}
    >
      <Text
        fontSize={"1.2rem"}
        textShadow="2px 2px 0 rgba(0, 0, 0, .7)"
      >
        Adivinhe qual é o personagem{isDaily ? " DE HOJE" : ""}!
      </Text>
      <HStack
        gap={".5rem"}
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
          tipText="Está vivo ou morto?"
        />
        <TipCard
          selectedCharacters={selectedCharacters}
          content={chosenCharacter.wand}
          hit={hit}
          icon={FaWandSparkles}
          minTries={8}
          tipText="Qual é a varinha?"
        />
      </HStack>
    </VStack>
  );
};

export default Tips;
