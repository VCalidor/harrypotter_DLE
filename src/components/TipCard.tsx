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
  tipText,
}: {
  selectedCharacters: any[];
  icon: any;
  content: string[];
  hit: boolean;
  minTries: number;
  tipText: string;
}) => {
  const [tip, setTip] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>(`${newTip} 1.5s ease-in-out`);
  const [flipping, setFlipping] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCharacters.length > minTries) {
      setTip(true);
    } else {
      setTip(false);
      setShowTip(false);
    }
  }, [selectedCharacters]);

  useEffect(() => {
    if (hit) {
      setTip(true);
    }
  }, [hit]);

  return (
    <VStack
      position={"relative"}
      key={`${showTip}${content[0]}Tip`}
      border={"solid 4px white"}
      borderBottom={"solid 4px rgba(173, 173, 173	)"}
      borderRight={"solid 4px rgba(	173, 173, 173	)"}
      borderRadius={4}
      w={"40%"}
      minWidth={100}
      height={80}
      color={"black"}
      background={"rgba(230, 230, 230)"}
      transition={".2s"}
      _hover={{
        cursor: tip ? "pointer" : "",
        transform: tip ? "scale(1.1)" : "",
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
        <>
          <Icon as={icon} boxSize={32} />
          <Icon
            boxSize={36}
            as={icon}
            position={"absolute"}
            middle={0}
            opacity={0.7}
            filter="blur(2px)"
            color={"rgb(60,60,60)"}
          />
          <Text
            position={"absolute"}
            bottom={-8}
            fontWeight={"bold"}
            color={"gray"}
            fontSize={14}
          >
            {tipText}
          </Text>
        </>
      )}
    </VStack>
  );
};

export default TipCard;
