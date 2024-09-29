import { Button, Icon, Text, VStack, keyframes } from "@chakra-ui/react";
import { GrPowerReset } from "react-icons/gr";

const glow = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 0, 255, 0.3), 0 0 30px rgba(0, 0, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(0, 0, 255, 0.5), 0 0 40px rgba(0, 0, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 0, 255, 0.3), 0 0 30px rgba(0, 0, 255, 0.4);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const UpdatingCharacter = () => {
  return (
    <VStack
      gap={"2rem"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      rounded={"md"}
      maxW={"90%"}
      padding={"3rem"}
    >
      <VStack
        fontWeight={"light"}
        letterSpacing={".1px"}
        fontFamily={"Harry P"}
        gap={0}
      >
        <Text fontSize={"2rem"}>O personagem será atualizado em breve.</Text>
        <Text fontSize={"1rem"}>Aguarde um momento e recarregue a página</Text>
      </VStack>
      <VStack
        w={"10vh"}
        h={"10vh"}
        borderRadius={"full"}
        background={`radial-gradient(circle, rgba(0, 0, 255, 0.4), rgba(0, 0, 139, 0.2), transparent)`}
        animation={`${glow} 2s infinite ease-in-out, ${pulse} 1.5s infinite ease-in-out, ${float} 3s infinite ease-in-out`}
      >
        <VStack
          w={"6vh"}
          h={"6vh"}
          margin={"auto"}
          borderRadius={"full"}
          background={`radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(0, 0, 255, 0.8))`}
          animation={`${pulse} 1.5s infinite ease-in-out`}
        />
      </VStack>
      <Button variant={"buttonVariant"} minW={"10rem"}>
        <Icon as={GrPowerReset} boxSize={"1.8rem"} color={"#0B090D"} />
        <Icon
          boxSize={"2rem"}
          as={GrPowerReset}
          color={"#0B090D"}
          position={"absolute"}
          opacity={0.5}
          filter="blur(2px)"
          onClick={() => window.location.reload()}
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
          Recarregar página
        </Text>
      </Button>
    </VStack>
  );
};

export default UpdatingCharacter;
