import { Flex, HStack, keyframes, Text, VStack } from "@chakra-ui/react";
import SelectedCharactersComponent from "./SelectedCharactersComponent";
import { Character } from "../interfaces";
import { useEffect, useRef, useState } from "react";

const atributes = [
  "Personagem",
  "Especie",
  "Genero",
  "Casa",
  "Ano de Nascimento",
  "Ancestralidade",
  "Atributos Mágicos",
  "Afiliações",
  "Primeira Aparição",
];

const goDown = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(98px);
  }`;

const scaleHeight = (height: number) => keyframes`
  0% {
    height: ${height}px;
  }
  100% {
    height: ${height + 98}px;
  }`;

const SelectedCharactersList = ({
  lastAddedCharacter,
  selectedCharacters,
  animate,
  chosenCharacter,
}: {
  lastAddedCharacter: Character | null;
  selectedCharacters: Character[];
  chosenCharacter: Character;
  animate: boolean;
}) => {
  const vStackRef = useRef<HTMLDivElement>(null);
  const [vStackHeight, setVStackHeight] = useState<number>(0);

  useEffect(() => {
    if (vStackRef.current) {
      const height = vStackRef.current.offsetHeight;

      setVStackHeight(height);
    }
  }, [lastAddedCharacter]);

  return (
    <VStack
      ref={vStackRef}
      gap={"1rem"}
      maxW={"90%"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      overflowX={"auto"}
      rounded={"md"}
      overflowY={"hidden"}
      paddingBottom={".4rem"}
      paddingX={".5rem"}
      alignItems="flex-start"
      animation={animate ? `${scaleHeight(vStackHeight)} .4s ease-in-out` : ""}
    >
      <HStack gap={"1rem"} fontSize={".85rem"} color={"#D9CEC5"}>
        {atributes.map((atribute, index) => {
          return (
            <Flex
              key={`atribute_${index}`}
              borderBottom={"solid 4px #F7F5F3"}
              width={"6.2rem"}
              height={"4rem"}
            >
              <Text margin={"auto"}>{atribute}</Text>
            </Flex>
          );
        })}
      </HStack>
      <VStack animation={animate ? `${goDown} .4s ease-in-out` : ""}>
        {lastAddedCharacter && (
          <SelectedCharactersComponent
            key={lastAddedCharacter.name}
            character={lastAddedCharacter}
            index={-1}
            chosenCharacter={chosenCharacter}
            isNew={true}
          />
        )}
        {selectedCharacters.map((character, index) => {
          return (
            <SelectedCharactersComponent
              key={character.name}
              character={character}
              index={index}
              chosenCharacter={chosenCharacter}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default SelectedCharactersList;
