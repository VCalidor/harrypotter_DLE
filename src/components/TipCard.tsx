import { Button, Icon, keyframes, Text } from "@chakra-ui/react";
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
    <Button
      position={"relative"}
      key={`${showTip}${content[0]}Tip`}
      variant="buttonVariant"
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
            <Text
              fontSize={".8rem"}
              margin={0}
              textShadow=".5px .5px 0 rgba(0, 0, 0, .4)"
            >
              {c}
            </Text>
          );
        })
      ) : (
        <>
          <Icon as={icon} boxSize={"2rem"} />
          <Icon
            boxSize={"2.2rem"}
            color={"rgb(60,60,60)"}
            as={icon}
            position={"absolute"}
            opacity={0.7}
            filter="blur(2px)"
          />
          <Text
            position={"absolute"}
            bottom={".3rem"}
            fontWeight={"bold"}
            fontSize={".8rem"}
            color={"gray"}
            textShadow=".5px .5px 0 rgba(0, 0, 0, .4)"
          >
            {tipText}
          </Text>
        </>
      )}
    </Button>
  );
};

export default TipCard;
