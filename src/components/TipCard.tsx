import { Icon, keyframes, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const newTip = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }`;

const flipPart1 = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(-90deg) scale(1.2);
  }`;

const flipPart2 = keyframes`
  0% {
    transform: rotateY(-90deg) scale(1.2);
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }`;

const TipCard = ({
  selectedCharacters,
  hit,
  icon,
  content,
  minTries,
}: {
  selectedCharacters: any[];
  icon: any;
  content: string[];
  hit: boolean;
  minTries: number;
}) => {
  const [tip, setTip] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>(`${newTip} 1.5s ease-in-out`);
  const [flipping, setFlipping] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCharacters.length > minTries) {
      setTip(true);
    }
  }, [selectedCharacters]);

  useEffect(() => {
    if (hit) {
      setTip(true);
    }
  }, [hit]);

  return (
    <VStack
      key={`${showTip}${content[0]}Tip`}
      border={"solid 2px white"}
      borderRadius={4}
      w={"40%"}
      minWidth={100}
      height={80}
      color={"black"}
      background={"rgba(255, 255, 255)"}
      _hover={{
        cursor: tip ? "pointer" : "",
      }}
      animation={tip ? animate : ""}
      justifyContent={"center"}
      gap={2}
      onClick={() => {
        if (tip && !flipping) {
          setAnimate(`${flipPart1} .75s ease-in-out`);
          setFlipping(true);
          setTimeout(() => {
            setAnimate(`${flipPart2} .75s ease-in-out`);
            setShowTip(!showTip);
            setTimeout(() => {
              setFlipping(false);
            }, 750);
          }, 750);
        }
      }}
    >
      {showTip ? (
        content.map((c) => {
          return (
            <Text fontSize={content.length > 2 ? 14 : 18} margin={0}>
              {c}
            </Text>
          );
        })
      ) : (
        <Icon as={icon} boxSize={36} />
      )}
    </VStack>
  );
};

export default TipCard;
