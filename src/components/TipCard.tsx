import { Button, Icon, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { flipPart1, flipPart2, newTip } from "../animations";

const TipCard = ({
  selectedCharacters,
  icon,
  content,
  minTries,
  tipText,
  hit,
}: {
  selectedCharacters: any[];
  icon: any;
  content: string[];
  hit: boolean;
  minTries: number;
  tipText: string;
}) => {
  const toast = useToast();

  const [showTip, setShowTip] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>(`${newTip} 1.5s ease-in-out`);
  const [flipping, setFlipping] = useState<boolean>(false);

  return (
    <Button
      position={"relative"}
      key={`${showTip}${content[0]}Tip`}
      variant="buttonVariant"
      animation={selectedCharacters.length > minTries || hit ? animate : ""}
      justifyContent={"center"}
      gap={2}
      _hover={{
        transform:
          selectedCharacters.length > minTries || hit ? "scale(1.1)" : "",
      }}
      onClick={() => {
        if (selectedCharacters.length > minTries || hit) {
          if (!flipping) {
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
        } else {
          toast({
            title: `Dica liberada em ${
              minTries + 1 - selectedCharacters.length
            } tentativas!`,
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
          {content.map((c, index) => {
            return (
              <Text
                fontSize={".8rem"}
                textShadow=".5px .5px 0 #332F40"
                key={`${c}_${index}`}
              >
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
            color={"#867F83"}
            textShadow="1px 1px 0 #332F40"
            textAlign="center"
            whiteSpace="normal"
            fontSize="clamp(0.6rem, 2.5vw, 0.8rem)"
          >
            {tipText}
          </Text>
        </>
      )}
    </Button>
  );
};

export default TipCard;
