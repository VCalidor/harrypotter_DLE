import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import SelectedCharactersComponentClassic from "./classicChallenge/SelectedCharactersComponent";
import SelectedCharactersComponentEmoji from "./emojiChallenge/SelectedCharactersComponent";
import { Character } from "../interfaces";
import { useEffect, useRef, useState } from "react";
import { appear, goDown, scaleHeight } from "../animations";

const atributes = [
  "Personagem",
  "Espécie",
  "Gênero",
  "Casa",
  "Ano de Nascimento",
  "Ancestralidade",
  "Atributos Mágicos",
  "Afiliações",
  "Primeira Aparição",
];

const SelectedCharactersList = ({
  lastAddedCharacter,
  selectedCharacters,
  animate,
  mode,
  chosenCharacter,
}: {
  lastAddedCharacter: Character | null;
  selectedCharacters: Character[];
  chosenCharacter: Character;
  mode: "classic" | "infinite" | "emoji";
  animate: boolean;
}) => {
  const vStackRef = useRef<HTMLDivElement>(null);
  const [vStackHeight, setVStackHeight] = useState<number>(0);
  const hasAppearedRef = useRef(false);

  useEffect(() => {
    if (vStackRef.current) {
      const height = vStackRef.current.offsetHeight;

      setVStackHeight(height);
    }
  }, [lastAddedCharacter]);

  useEffect(() => {
    hasAppearedRef.current = true;
  }, []);

  const ComponentToRender =
    mode === "emoji"
      ? SelectedCharactersComponentEmoji
      : SelectedCharactersComponentClassic;

  return (
    <VStack
      ref={vStackRef}
      gap={"1rem"}
      maxW={"90%"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      backdropFilter="blur(2px)"
      overflowX={"auto"}
      rounded={"md"}
      overflowY={"hidden"}
      paddingBottom={".4rem"}
      paddingX={".5rem"}
      alignItems="flex-start"
      animation={
        hasAppearedRef
          ? animate
            ? `${scaleHeight(vStackHeight)} .4s ease-in-out`
            : ""
          : `${appear} .2s ease-in-out`
      }
    >
      {mode === "classic" && (
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
      )}

      <VStack
        animation={animate ? `${goDown} .4s ease-in-out` : ""}
        gap={"1rem"}
        minWidth={"400px"}
        paddingY={2}
      >
        {lastAddedCharacter && (
          <ComponentToRender
            key={lastAddedCharacter.name}
            character={lastAddedCharacter}
            index={-1}
            chosenCharacter={chosenCharacter}
            isNew={true}
          />
        )}
        {selectedCharacters.map((character, index) => {
          return (
            <ComponentToRender
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
