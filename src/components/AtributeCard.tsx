import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImArrowUp } from "react-icons/im";

const AtributeCard = ({
  atributes,
  chosenCharacterAtribute,
  time,
  isNew = false,
  character,
  moreOrLess = false,
  estimated,
  comparingWith,
}: {
  atributes: string[] | number[];
  chosenCharacterAtribute: Array<string | number>;
  time: number;
  isNew?: boolean;
  character?: any;
  moreOrLess?: boolean;
  comparingWith?: number[];
  estimated?: boolean;
}) => {
  const [opacity, setOpacity] = useState(isNew ? 0 : 1);
  const [uod, setUod] = useState(0);

  useEffect(() => {
    if (isNew) {
      setTimeout(() => {
        setOpacity(1);
      }, time * 700);
    }
    if (moreOrLess) upOrDown();
  }, []);

  function greenRedOrOrange() {
    const color = atributes.map((atribute) => {
      if (chosenCharacterAtribute.includes(atribute)) return true;
      return false;
    });

    if (color.every((e) => e === true)) {
      if (atributes.length === chosenCharacterAtribute.length) return "green";
    }
    if (color.some((e) => e === true)) return "orange";
    return "red";
  }

  function upOrDown() {
    const comparison = comparingWith
      ? comparingWith
      : [atributes[0], chosenCharacterAtribute[0]];

    if (
      typeof comparison[0] === "number" &&
      typeof comparison[1] === "number"
    ) {
      if (comparison[1] > comparison[0]) setUod(1);
      else if (comparison[1] < comparison[0]) setUod(-1);
    } else if (
      typeof comparison[0] === "number" ||
      typeof comparison[1] === "number"
    ) {
      setUod(typeof comparison[0] === "number" ? -1 : 1);
    }
  }

  return (
    <Flex
      zIndex={0}
      key={character.name}
      width={100}
      height={90}
      flexDirection={"column"}
      bg={greenRedOrOrange()}
      borderRadius={4}
      transition={".7s"}
      opacity={opacity}
      transform={`scale(${opacity})`}
      justifyContent={"space-evenly"}
      position={"relative"}
      alignItems={"center"}
      _hover={{ transform: "scale(1.1)", transition: ".3s" }}
    >
      {atributes.map((atribute, index) => (
        <Text
          key={`atribute_${index}`}
          margin={0}
          marginX={3}
          fontSize={atributes.length < 4 ? 16 : atributes.length == 4 ? 11 : 10}
        >
          {atribute} {estimated ? "+/-" : ""}{" "}
        </Text>
      ))}
      {uod !== 0 && (
        <Box
          position={"absolute"}
          transform={`rotate(${uod > 0 ? "" : "180deg"})`}
        >
          <ImArrowUp
            size={80}
            color={"white"}
            opacity={0.2}
            style={{ alignSelf: "center" }}
          />
        </Box>
      )}
    </Flex>
  );
};

export default AtributeCard;
