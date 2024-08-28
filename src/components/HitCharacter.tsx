import { Box, Center, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { Character } from "../interfaces";

const HitCharacter = ({
  chosenCharacter,
  hits,
  tries,
}: {
  chosenCharacter: Character;
  hits: number;
  tries: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <VStack
      backgroundColor="rgba(0, 0, 0, 0.6)"
      borderRadius={6}
      padding={64}
      paddingX={96}
      gap={26}
      marginTop={64}
    >
      <Text as={"h2"} margin={0}>
        Parabéns
      </Text>
      <Flex gap={42}>
        <Flex
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          position={"relative"}
          borderRadius={4}
          width={100}
          height={90}
          transition={".75s"}
          border={"solid 4px black"}
        >
          <Image
            borderRadius={4}
            width={100}
            height={90}
            src={chosenCharacter.img}
            alt={chosenCharacter.name}
          />
          <Center
            position={"absolute"}
            zIndex={10}
            width={100}
            height={90}
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
              {chosenCharacter.alias && (
                <Text color={"black"} margin={"0"} fontSize={8}>
                  {chosenCharacter.alias}
                </Text>
              )}
            </Box>
          </Center>
        </Flex>
        <VStack gap={0}>
          <Text color={"gray"} fontSize={12} marginBottom={4}>
            Você acertou
          </Text>
          <Text margin={0}>{chosenCharacter.name}</Text>
        </VStack>
      </Flex>
      <Box>
        <Text margin={0}>
          Você foi o #{hits} a encontrar o personagem hoje!
        </Text>
        <Text marginBottom={0}>Número de tentativas: {tries}</Text>
      </Box>
      <Box>
        <Text margin={0} fontSize={24}>
          Próximo personagem em:
        </Text>
        <Text margin={0} marginTop={12} fontSize={32}>
          05:26:32
        </Text>
      </Box>
    </VStack>
  );
};

export default HitCharacter;
