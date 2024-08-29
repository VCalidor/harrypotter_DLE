import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CharacterImageCard = ({
  imgSrc,
  name,
  isNew = false,
}: {
  imgSrc: string;
  name: string;
  isNew?: boolean;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [opacity, setOpacity] = useState(isNew ? 0 : 1);

  useEffect(() => {
    if (isNew) {
      setOpacity(1);
    }
  }, []);

  return (
    <Flex
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      position={"relative"}
      borderRadius={4}
      width={100}
      height={90}
      transition={".7s"}
      opacity={opacity}
      transform={`scale(${opacity})`}
    >
      <Image
        borderRadius={4}
        width={100}
        height={90}
        src={imgSrc}
        alt={imgSrc}
      />
      <Center
        position={"absolute"}
        zIndex={10}
        width={100}
        height={90}
        transition={".2s"}
        opacity={isHovering ? 100 : 0}
      >
        <Box background={"yellow"} borderRadius={4} padding={8} maxWidth={46}>
          <Text color={"black"} margin={"0"} fontSize={12}>
            {name}
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default CharacterImageCard;
