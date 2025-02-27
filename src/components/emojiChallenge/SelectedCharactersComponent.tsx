import { HStack, Text } from "@chakra-ui/react";
import CharacterImageCard from "./CharacterImageCard";

import { Character } from "../../interfaces";
import { useEffect, useState } from "react";

const SelectedCharactersComponent = ({
  character,
  chosenCharacter,
  isNew = false,
}: {
  character: Character;
  chosenCharacter: Character;
  isNew?: boolean;
}) => {
  const [opacity, setOpacity] = useState(isNew ? 0 : 1);
  const [transform, setTransform] = useState(
    isNew ? "translateY(-30px) scale(0.8) rotate(10deg)" : ""
  );

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTransform("translateY(0) scale(1) rotate(0deg)");
    }, 700);
  }, [isNew]);

  return (
    <HStack gap={"1rem"} justifyContent={"end"} height={"5.6rem"} w={"full"} pr={".1rem"}>
      <CharacterImageCard
        imgSrc={character.image}
        name={character.name}
        isNew={isNew}
      />
      <HStack
        bg={character.name === chosenCharacter.name ? "#657F24" : "#871717"}
        transition="transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.7s ease"
        _hover={{ transform: "scale(1.05) rotate(1deg)", transition: ".3s" }}
        opacity={opacity}
        transform={transform}
        height={"full"}
        w={"full"}
        rounded={"md"}
        pl={"1rem"}
        border={"solid 2px rgb(11, 9, 13, .7)"}
      >
        <Text>{character.name}</Text>
      </HStack>
    </HStack>
  );
};

export default SelectedCharactersComponent;
