import { Center, Flex, Image, Text } from "@chakra-ui/react";
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
    <Flex
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      position={"relative"}
      borderRadius={4}
      width={"6.2rem"}
      height={"5.6rem"}
      transition="transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.7s ease"
      opacity={opacity}
      transform={transform}
      _hover={{ transform: "scale(1.1) rotate(2deg)", transition: ".3s" }}
    >
      <Image
        borderRadius={4}
        width={"6.2rem"}
        height={"5.6rem"}
        src={imgSrc}
        alt={name}
      />
      <Center
        position={"absolute"}
        zIndex={10}
        width={"6.2rem"}
        height={"5.6rem"}
        transition={".2s"}
        opacity={isHovering ? 1 : 0}
      >
        <Center
          background={"yellow"}
          borderRadius={4}
          maxWidth={"4rem"}
          h={"4rem"}
          padding={".2rem"}
        >
          <Text color={"black"} margin={"auto"} fontSize={".6rem"}>
            {name}
          </Text>
        </Center>
      </Center>
    </Flex>
  );
};

export default CharacterImageCard;
