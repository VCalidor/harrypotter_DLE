import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import { emojiCharacter } from "../../interfaces";
import { appear } from "../../animations";
import React from "react";

const Tips = ({
  selectedCharactersLength,
  chosenCharacter,
  hit,
}: {
  selectedCharactersLength: number;
  chosenCharacter: emojiCharacter;
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
      animation={`${appear} .2s ease-in-out`}
      backdropFilter="blur(2px)"
    >
      <Text fontSize={"1.2rem"} textShadow="2px 2px 0 rgba(0, 0, 0, .7)">
        Adivinhe qual é o personagem de hoje!
      </Text>
      <HStack
        gap={".5rem"}
        w={"100%"}
        flexWrap={"wrap"}
        justifyContent={"space-around"}
      >
        {chosenCharacter.emoji.map((emo, index) => (
          <React.Fragment key={emo}>
            {selectedCharactersLength >= index || hit ? (
              <Text
                fontSize={"44px"}
                boxSize={"4rem"}
                transition={"0.2s"}
                _hover={{
                  transform: "scale(1.2)",
                }}
                animation={`${appear} .3s ease-in-out`}
              >
                {emo}
              </Text>
            ) : (
              <Box
                fontFamily={"Harry P"}
                fontSize={"44px"}
                boxSize={"4rem"}
                bg={"black"}
                borderRadius={"100%"}
                boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                _hover={{
                  transform: "scale(1.2)",
                }}
                transition={"0.2s"}
              >
                ?
              </Box>
            )}
          </React.Fragment>
        ))}
      </HStack>
    </VStack>
  );
};

export default Tips;
