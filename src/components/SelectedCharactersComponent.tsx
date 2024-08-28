import { HStack } from "@chakra-ui/react";
import CharacterImageCard from "./CharacterImageCard";

import AtributeCard from "./AtributeCard";
import { Character } from "../interfaces";


const SelectedCharactersComponent = ({
  character,
  index,
  chosenCharacter,
  isNew = false,
}: {
  character: Character;
  index: number;
  chosenCharacter: Character;
  isNew?: boolean;
}) => {
  return (
    <HStack gap={12} key={`selectedCharacter_${index + 1}`}>
      <CharacterImageCard
        imgSrc={character.img}
        name={character.name}
        isNew={isNew}
      />
      <AtributeCard
        atributes={character.gender}
        chosenCharacterAtribute={chosenCharacter.gender}
        time={0.75}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.species}
        chosenCharacterAtribute={chosenCharacter.species}
        time={1.5}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.birth_year}
        chosenCharacterAtribute={chosenCharacter.birth_year}
        time={2.25}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.house}
        chosenCharacterAtribute={chosenCharacter.house}
        time={3}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.atributes}
        chosenCharacterAtribute={chosenCharacter.atributes}
        time={3.75}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.filiations}
        chosenCharacterAtribute={chosenCharacter.filiations}
        time={4.5}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.first_appearance}
        chosenCharacterAtribute={chosenCharacter.first_appearance}
        time={5.25}
        isNew={isNew}
        character={character}
      />
    </HStack>
  );
};

export default SelectedCharactersComponent;
