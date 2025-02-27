import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImArrowUp } from "react-icons/im";
import { PiPlusMinusLight } from "react-icons/pi";

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
  const [transform, setTransform] = useState(
    isNew ? "translateY(-30px) scale(0.8) rotate(10deg)" : ""
  );

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTransform("translateY(0) scale(1) rotate(0deg)");
    }, time * 700);
    if (moreOrLess) upOrDown();
  }, [isNew, time, moreOrLess]);

  function greenRedOrOrange() {
    const color = atributes.map((atribute) => {
      if (chosenCharacterAtribute.includes(atribute)) return true;
      return false;
    });

    if (color.every((e) => e === true)) {
      if (atributes.length === chosenCharacterAtribute.length) return "#657F24";
    }
    if (color.some((e) => e === true)) return "#AF811E";
    return "#871717";
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
      key={character.name}
      width={"6.2rem"}
      height={"5.6rem"}
      flexDirection={"column"}
      bg={greenRedOrOrange()}
      rounded={"md"}
      transition="transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.7s ease"
      opacity={opacity}
      transform={transform}
      justifyContent={"space-evenly"}
      position={"relative"}
      alignItems={"center"}
      _hover={{ transform: "scale(1.1) rotate(2deg)", transition: ".3s" }}
      paddingX={"2px"}
      border={"solid 2px rgb(11, 9, 13, .7)"}
    >
      {atributes.map((atribute, index) => (
        <HStack gap={1} key={`${character.name}_atribute_${index}`}>
          <Text
            fontSize={
              atributes.length < 3
                ? ".85rem"
                : atributes.length < 4
                ? ".6rem"
                : ".55rem"
            }
          >
            {atribute}{" "}
          </Text>
          {estimated && <Icon as={PiPlusMinusLight} />}
        </HStack>
      ))}
      {uod !== 0 && (
        <Box
          position={"absolute"}
          transform={`rotate(${uod > 0 ? "" : "180deg"})`}
        >
          <ImArrowUp
            size={80}
            opacity={0.2}
            style={{ alignSelf: "center" }}
            color="#F6D8AE"
          />
        </Box>
      )}
    </Flex>
  );
};

export default AtributeCard;
