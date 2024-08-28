import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AtributeCard = ({
  atributes,
  chosenCharacterAtribute,
  time,
  isNew = false,
  character,
}: {
  atributes: string[] | number[];
  alias?: string;
  chosenCharacterAtribute: Array<string | number>;
  time: number;
  isNew?: boolean;
  character?: any;
}) => {
  const [opacity, setOpacity] = useState(isNew ? 0 : 1);

  useEffect(() => {
    if (isNew) {
      setTimeout(() => {
        setOpacity(1);
      }, time * 750);
    }
  }, []);

  function greenRedOrOrange() {
    const color = atributes.map((atribute) => {
      if (chosenCharacterAtribute.includes(atribute)) return true;
      return false;
    });

    console.log(color, atributes);

    if (color.every((e) => e === true)) {
      if (atributes.length === chosenCharacterAtribute.length) return "green";
    }
    if (color.some((e) => e === true)) return "orange";
    return "red";
  }

  return (
    <Flex
      key={character.name}
      width={100}
      height={90}
      flexDirection={"column"}
      bg={greenRedOrOrange()}
      borderRadius={4}
      transition={".75s"}
      opacity={opacity}
      transform={`scale(${opacity})`}
      justifyContent={"center"}
      gap={3}
    >
      {atributes.map((atribute, index) => (
        <Text
          key={`atribute_${index}`}
          margin={0}
          marginX={3}
          fontSize={atributes.length < 3 ? 16 : 14}
        >
          {atribute}
        </Text>
      ))}
    </Flex>
  );
};

export default AtributeCard;
