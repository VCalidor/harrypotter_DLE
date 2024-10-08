import { HStack } from "@chakra-ui/react";
import CharacterImageCard from "./CharacterImageCard";

import AtributeCard from "./AtributeCard";
import { Character } from "../interfaces";

const time = 0.7;

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
    <HStack gap={"1rem"} key={`selectedCharacter_${index + 1}`}>
      <CharacterImageCard
        imgSrc={character.image}
        name={character.name}
        isNew={isNew}
      />
      <AtributeCard
        atributes={character.species}
        chosenCharacterAtribute={chosenCharacter.species}
        time={time}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.gender}
        chosenCharacterAtribute={chosenCharacter.gender}
        time={time * 2}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.house}
        chosenCharacterAtribute={chosenCharacter.house}
        time={time * 3}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.birth_year}
        estimated={character.estimate}
        chosenCharacterAtribute={chosenCharacter.birth_year}
        moreOrLess={true}
        time={time * 4}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.ancestry}
        chosenCharacterAtribute={chosenCharacter.ancestry}
        time={time * 5}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.magical_attributes}
        chosenCharacterAtribute={chosenCharacter.magical_attributes}
        time={time * 6}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={character.affiliations}
        chosenCharacterAtribute={chosenCharacter.affiliations}
        time={time * 7}
        isNew={isNew}
        character={character}
      />
      <AtributeCard
        atributes={[character.first_appearance[0]]}
        chosenCharacterAtribute={[chosenCharacter.first_appearance[0]]}
        moreOrLess={true}
        comparingWith={[
          character.first_appearance[1],
          chosenCharacter.first_appearance[1],
        ]}
        time={time * 8}
        isNew={isNew}
        character={character}
      />
    </HStack>
  );
};

export default SelectedCharactersComponent;
