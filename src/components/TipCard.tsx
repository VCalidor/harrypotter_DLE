import {
  Button,
  Icon,
  keyframes,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
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
  const toast = useToast();

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
      _hover={{ transform: tip ? "scale(1.1)" : "" }}
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
        } else {
          toast({
            title: `Dica liberada com ${minTries + 2} tentativas!`,
            status: "info",
            duration: 1000,
            position: "top-right",
            isClosable: true,
          });
        }
      }}
    >
      {showTip ? (
        <VStack>
          {content.map((c) => {
            return (
              <Text fontSize={".8rem"} textShadow=".5px .5px 0 #332F40">
                {c}
              </Text>
            );
          })}
        </VStack>
      ) : (
        <>
          <Icon as={icon} boxSize={"2rem"} color={"#0B090D"} />
          <Icon
            boxSize={"2.2rem"}
            color={"#0B090D"}
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
            color={"#867F83"}
            textShadow="1px 1px 0 #332F40"
          >
            {tipText}
          </Text>
        </>
      )}
    </Button>
  );
};

export default TipCard;
