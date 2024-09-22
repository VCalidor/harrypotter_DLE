import { Flex, HStack, keyframes, Text, VStack } from "@chakra-ui/react";

import SelectedCharactersComponent from "./SelectedCharactersComponent";
import { Character } from "../interfaces";

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
  return (
    <Flex as="main" flexDirection={"column"} gap={12}>
      <HStack gap={12}>
        {atributes.map((atribute, index) => {
          return (
            <Flex
              key={`atribute_${index}`}
              width={100}
              height={60}
              borderBottom={"solid 4px white"}
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
    </Flex>
  );
};

export default SelectedCharactersList;
